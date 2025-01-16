"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "../components/Button";
import { removeNotificationForUser } from "@/services/notification.service";
import { useRouter } from "next/navigation";

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
* @param {[NotificationData]} param0.notifications
* */
export default function NotificationsTable({notifications, userId}) {
    const router = useRouter();
    const [checkedNotifications, setCheckedNotifications] = useState(notifications.map(_ => false));
    const selectedNum = checkedNotifications.reduce((acc, curr) => acc + (curr ? 1: 0), 0);
    const allSelected = selectedNum === checkedNotifications.length - 1;
    const noneSelected = selectedNum === 0;

    const menuText = noneSelected ? "Select all" : `${selectedNum} selected`;

    const onSelectAll = () => {
        setCheckedNotifications(notifications.map(_ => !allSelected));
    }

    const onRemoveNotifications = async () => {
        const notificationsToRemove = notifications 
            .map(n => n._id)
            .filter((_, index) => checkedNotifications[index]);

        if (notificationsToRemove.length === 0) return;
        await removeNotificationForUser(userId, notificationsToRemove);
        setCheckedNotifications(notifications.map(_ => false)
            .slice(0, -notificationsToRemove.length));
        router.refresh();
    }

    const onNotificationCheck = (index) => {
        const newChecked = [...checkedNotifications];
        newChecked[index] = !newChecked[index];
        setCheckedNotifications(newChecked);
    }

    return (<div>
                <div className="flex items-center p-2 bg-gray-300 h-12">
                    <input type="checkbox" onChange={onSelectAll} checked={allSelected} />
                    <p className="mx-2"><b> {menuText}</b> </p>
                    <Button onClick={onRemoveNotifications} className={noneSelected ? "hidden": ""}>Remove</Button>
                </div>
                {notifications.map((n, index) => {
                    return <div key={index} className="flex border p-2 hover:bg-gray-100">
                            <input 
                                type="checkbox" 
                                checked={checkedNotifications[index]} 
                                onChange={() => onNotificationCheck(index)}
                            />
                            <Link href={n.link} className="ml-2 w-full flex justify-between">
                                <div className="w-full">
                                    <div className="flex justify-between">
                                        <p className="text-sm text-gray-600"> {n.notificationType} </p>
                                        <p className="text-sm text-gray-600">{getDateText(n.dateReceived)}</p>
                                    </div>
                                    <p> {n.text} </p>
                                </div>
                            </Link>
                        </div>
                })}
            </div>);

}

/**
* @param {Date} date 
* */
function getDateText(date) {
    return "on " + date.toDateString();
}

