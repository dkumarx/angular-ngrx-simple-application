import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Customer } from '../models/customer';

export class CustomerData implements InMemoryDbService {

    createDb() {
        const customers: Customer[] = [
            {
                id: 1,
                custFirstName: 'Dummy cust',
                custLastName: 'Last name',
                custDOB: '13/05/1987',
                custEmail: 'test@mailinator.com',
                custPhone: '0456398777',
                custAddress: '3000 Melbournd CBD, VIC'
            }
        ];
        return { customers }
    }
}
