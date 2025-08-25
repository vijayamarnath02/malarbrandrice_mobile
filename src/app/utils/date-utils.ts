// date-utils.ts
export function getValidPastOrToday(dateString: string): string {
    if (!dateString) {
        return formatToday();
    }

    const entered = new Date(dateString);
    if (isNaN(entered.getTime())) {
        return formatToday();
    }

    // Remove time part
    entered.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return entered <= today ? formatDate(entered) : formatToday();
}

function formatToday(): string {
    return formatDate(new Date());
}

function formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}
