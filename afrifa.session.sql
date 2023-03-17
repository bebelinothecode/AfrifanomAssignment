create table loans (
    id int primary key auto_increment,
    loan_amount int not null,
    interest int not null,
    foreign key(phoneNumber) references customerInfo(phoneNumber)
);