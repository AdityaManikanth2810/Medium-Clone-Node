# Medium Clone based on realworld.io
    
## Technologies Used

1. NodeJS
2. TypeScript
3. PostgreSQL
4. TypeORM

## Database Connection
1. Enter psql as admin.
2. Create Database user and grant previlages.
    
``` psql
    create database mediumClone;
    create user USER with encrypted password 'PASSWORD';
    grant all privileges on database mediumClone to USER;
```