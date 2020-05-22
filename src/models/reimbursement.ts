export class Reimbursement {

    reimb_id: number;
    amount: number;
    timeSubmitted: Date;
    timeResolved: Date;
    description: string;
    author_id: number;
    resolver_id: number;
    reimb_status_id: number;
    reimb_type_id: number;
    
    constructor(
        reimb_id: number, 
        amount: number, 
        submitted: Date, 
        resolved: Date, 
        description: string, 
        author_id: number, 
        resolver_id: number, 
        reimb_status_id: number,
        reimb_type_id: number 
    ) {
        this.reimb_id = reimb_id;
        this.amount = amount;
        this.timeSubmitted = submitted;
        this.timeResolved = resolved;
        this.description = description;
        this.author_id = author_id;
        this.resolver_id = resolver_id;
        this.reimb_status_id = reimb_status_id;
        this.reimb_type_id = reimb_type_id;  
    }
}