# Library Management 

This a a full fledged library management system which has functionalities nothing less than an ofline library

## Setup

Clone this repo and run 

```bash
npm install
```

Then start the server by 

```bash
nodemon app.js
```

[SET UP MYSQL(Windows users Look up) ](https://www.mysqltutorial.org/install-mysql-ubuntu/)

```bash
CREATE DATABASE USERS;
```
```bash
USE USERS;
```
```bash
CREATE TABLE USERS_DATA (Name VARCHAR(255),Email VARCHAR(255),Password VARCHAR(255));
```
```bash
CREATE TABLE Books (book_id INT AUTO_INCREMENT PRIMARY KEY,book_name VARCHAR(255),book_count VARCHAR(255));
```


```bash
CREATE TABLE Books_Status (Request_ID INT AUTO_INCREMENT PRIMARY KEY,User_Email VARCHAR(255),Book_ID INT, Status VARCHAR(255));
```


Set Up Database, And you are good to go :)
