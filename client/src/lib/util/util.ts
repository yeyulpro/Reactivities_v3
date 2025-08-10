
// import z from "zod"


// export function formatDate(date:DateArg<Date>){
//     return format(date, 'dd MMM yyyy h:mm a')
// }

import { formatDistanceToNow } from "date-fns";

export function timeAgo(date: Date | number) {
  return formatDistanceToNow(date) + " ago";
}
  