const moment = require('moment');

const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler');

module.exports.overview = async function (req, res) {
    console.log('32131231232');
    try {
        const allOrders = await Order.find({
            user: req.user.id
        }).sort({data: 1});
        const ordersMap = getOrdersMap(allOrders);

        const yerstadayOrders = ordersMap[moment().add(-1, 'd')].format('DD.MM.YYYY') || [];
        
        // Количество заказов вчера
        const yerstadayOrdersNumber = yerstadayOrders.length;
        
        // Количество заказов
        const totalOrdersNumber = allOrders.length;

        // Количество дней всего
        const daysNumber = Object.keys(ordersMap).length;

        // Количество заказов в день
        const ordersPerDay = totalOrdersNumber / daysNumber.toFixed(0);

        // Процент для количества заказов
        // ((заказы вчера / кол-во заказов в день) - 1) * 100
        const ordersPercent = (((yerstadayOrdersNumber / ordersPerDay) - 1) * 100).toFixed(2);

        // Общая выручка
        const totalGain = calculatePrice(allOrders);

        // Выручка в день
        const gainPerDay = totalGain / daysNumber;

        // Выручка за вчера
        const yesterdayGain = calculatePrice(yerstadayOrders);

        // Процент выручки
        const gainPercent = (((yesterdayGain / gainPerDay) - 1) * 100).toFixed(2);

        // Сравнение выручки
        const compareGain = (yesterdayGain - gainPerDay).toFixed(2);

        // Сравнение кол-ва заказов
        const compareNumber = (yerstadayOrdersNumber - ordersPerDay).toFixed(2);


        res.status(200).json({
            gain: {
                percent: Math.abs(+gainPercent),
                compare: Math.abs(+compareGain),
                yesterday: +yesterdayGain,
                isHigher: +gainPercent > 0
            },
            orders: {
                percent: Math.abs(+ordersPercent),
                compare: Math.abs(+compareNumber),
                yesterday: +yerstadayOrdersNumber,
                isHigher: +ordersPercent > 0
            }
        });
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.analytics = function (req, res) {
    res.status(200).json({
        data: true
    });
}

function getOrdersMap(orders = []) {
    const daysOrders = {};
    orders.forEach(order => {
        const date = moment(order.date).format('DD.MM.YYYY');
        if (date === moment().format('DD.MM.YYYY')) {
            return;
        }

        if (!daysOrders[date]) {
            daysOrders[date] = [];
        }


        daysOrders[date].push(order);
    });
    return daysOrders;
}

function calculatePrice(orders = []) {
    return orders.reduce((total, order) => {
        const orderPrice = order.list.reduce((orderTotal, item) => {
            return orderTotal += item.cost * item.quantity;
        }, 0);
        return total += orderPrice;
    }, 0);
}