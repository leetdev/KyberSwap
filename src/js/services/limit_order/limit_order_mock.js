import { timeout } from "../../utils/common"
import BLOCKCHAIN_INFO from "../../../../env"

const MAX_REQUEST_TIMEOUT = 3000

export function getOrders() {
    return new Promise((resolve, rejected) => {
        timeout(MAX_REQUEST_TIMEOUT, fetch('/user/orders'))
            .then((response) => {
                return response.json()
            }).then((result) => {
                if (!result.error) {
                    resolve(result.data)
                } else {
                    rejected(new Error("Cannot get user orders"))
                }
            })
            .catch((err) => {
                rejected(new Error("Cannot get user orders"))
            })
    })
}


export function submitOrder(order) {
    return new Promise((resolve, rejected) => {
        timeout(MAX_REQUEST_TIMEOUT, fetch('/user/submit_order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order)
        }))
            .then((response) => {
                return response.json()
            }).then((result) => {
                if (!result.error) {
                    resolve(result.data)
                } else {
                    rejected(new Error("Cannot submit order"))
                }
            })
            .catch((err) => {
                rejected(new Error("Cannot submit order"))
            })
    })
}


export function cancelOrder(order) {
    return new Promise((resolve, rejected) => {
        timeout(MAX_REQUEST_TIMEOUT, fetch('/user/cancel_order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order)
        }))
            .then((response) => {
                return response.json()
            }).then((result) => {
                if (!result.error) {
                    resolve("Cancel order successfully")
                } else {
                    rejected(new Error("Cannot cancel order"))
                }
            })
            .catch((err) => {
                rejected(new Error("Cannot cancel order"))
            })
    })
}


export function getNonce(userAddr, source, dest) {
    return new Promise((resolve, rejected) => {
        resolve(1)
    })
}


export function getFee(userAddr, source, dest) {
    return new Promise((resolve, rejected) => {
        resolve(0.4)
    })
}