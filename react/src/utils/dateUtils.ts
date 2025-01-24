export const formatDateToDDMMYYYY = (dateString: string) => {
    if ( dateString === "" || dateString === null || dateString === undefined) return "----"; 

    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};
