export class Reimbursement {

    reimb_id: number;
    amount: number;
    submitted: Date;
    resolved: Date;
    description: String;
    author_id: number;
    resolver_id: number;
    reimb_status_id: number;
    reimb_type_id: number;
    
    constructor(
        id: number, 
        amount: number, 
        submitted: Date, 
        resolved: Date, 
        description: String, 
        author_id: number, 
        resolver_id: number, 
        reimb_status_id: number,
        reimb_type_id: number 
    ) {
        this.reimb_id = id;
        this.amount = amount;
        this.submitted = submitted;
        this.resolved = resolved;
        this.description = description;
        this.author_id = author_id;
        this.resolver_id = resolver_id;
        this.reimb_status_id = reimb_status_id;
        this.reimb_type_id = reimb_type_id;  
    }
}