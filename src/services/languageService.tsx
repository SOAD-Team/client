
import { Language } from '../models/language';
import { Service } from './service';

export class LanguageService extends Service<Language>{
    static instance: LanguageService = null;

    private constructor(){
        super('language');
    }

    public static Singleton() : LanguageService{
        if(!this.instance)
            this.instance = new LanguageService();
        return this.instance;
    }
}