import dotenv from 'dotenv';

dotenv.config();

export const environment ={
    todoistEmail: process.env.TODOIST_EMAIL,
    todoistPassword: process.env.TODOIST_PASSWORD
}