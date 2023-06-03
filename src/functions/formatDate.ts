export const formatDate=(date:string)=>{
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'UTC'
    };
      
    const finalDate = new Date(date).toLocaleString('en-us');
    return finalDate;
}