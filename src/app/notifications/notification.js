import Link from "next/link";

/**
* @typedef NotificationData
* @property {String} text
* @property {String} notificationType
* @property {Date} dateReceived
* @property {String} link
* @property {Boolean} isChecked
*
*
*
* @param {Object} param0
* @param {NotificationData} param0.notificationData
* */
export default function Notification({ notificationData }) {
    return <div className="border border-black flex" >
        <input type="checkbox" checked={notificationData.isChecked}/>
        <Link href={notificationData.link}>{notificationData.text}</Link>
    </div>
}
