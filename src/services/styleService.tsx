import { Style } from '../models/style';
import { Service } from './service';

export class StyleService extends Service<Style>{
    static instance: StyleService = null;

    private constructor(){
        super('style');
    }

    public static Singleton() : StyleService{
        if(!this.instance)
            this.instance = new StyleService();
        return this.instance;
    }
}