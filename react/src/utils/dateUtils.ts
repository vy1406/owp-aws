
export const formatDateToDDMMYYYY = (dateString: string | null) => {
    if ( dateString === "" || dateString === null || dateString === undefined) return "----"; 

    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};


export function calculateDaysSinceDate(date: Date | string | number | null | undefined): string {
    if (!date) {
        return 'N/A';
    }

    const givenDate = new Date(date);
    const today = new Date();

    if (isNaN(givenDate.getTime())) {
        throw new Error('Invalid date');
    }

    const givenDateUTC = Date.UTC(givenDate.getUTCFullYear(), givenDate.getUTCMonth(), givenDate.getUTCDate());
    const todayUTC = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());

    const timeDifference = todayUTC - givenDateUTC;
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    return daysDifference.toString();
}

export function calculateDaysDifference(
    date1: Date | string | number | null | undefined,
    date2: Date | string | number | null | undefined
): string {
    if (!date1 || !date2) {
        return 'N/A';
    }

    const firstDate = new Date(date1);
    const secondDate = new Date(date2);

    if (isNaN(firstDate.getTime()) || isNaN(secondDate.getTime())) {
        throw new Error('Invalid date');
    }

    const firstDateUTC = Date.UTC(firstDate.getUTCFullYear(), firstDate.getUTCMonth(), firstDate.getUTCDate());
    const secondDateUTC = Date.UTC(secondDate.getUTCFullYear(), secondDate.getUTCMonth(), secondDate.getUTCDate());

    const timeDifference = Math.abs(secondDateUTC - firstDateUTC);
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return daysDifference.toString();
}
