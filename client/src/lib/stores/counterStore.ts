
import { makeAutoObservable} from 'mobx';

export default class CounterStore{
    title='Counter Store'
    count=10;
    events:string[]=[`Initial count is ${this.count}`];

    constructor(){
        makeAutoObservable(this);
    }

    increment=(amount=1)=>{
        this.count+=amount;
        this.events.push(`incremented by ${amount}- so current number is ${this.count}.`)
    }
    
    decrement=(amount=1)=>{
        this.count-=amount;
         this.events.push(`incremented by ${amount}- so current number is ${this.count}.`)
    }
    
    get eventCount(){

        return this.events.length

    }
    
}



