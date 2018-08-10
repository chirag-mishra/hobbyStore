import {Pipe} from "@angular/core";

@Pipe({
    name: 'stringFilter'
})
export class StringFilterPipe {

    transform(value: any, q: string) {
        if (!q || q === '') {
            return value;
        }
        return value.filter(item => item.title.toLowerCase().indexOf(q.toLowerCase()) !== -1);
    }
}