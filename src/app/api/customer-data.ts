import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Customer } from '../models/customer';

export class CustomerData implements InMemoryDbService {

    createDb() {
        const customers: Customer[] = [
            {
                id: 1,
                custFirstName: 'Dummy cust',
                custLastName: 'Last name',
                custEmail: 'test@mailinator.com'
            }
        ];
        return { customers };
    }
}
