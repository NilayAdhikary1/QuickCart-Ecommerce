import bcrypt from "bcryptjs";

export const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('admin123', 10),
        isAdmin: true
    },
    {
        name: 'Nilay Adhikary',
        email: 'nilay@cts.com',
        password: bcrypt.hashSync('nilay123', 10),
        isAdmin: false
    },
    {
        name: 'Dhruba Mondal',
        email: 'dhruba@example.com',
        password: bcrypt.hashSync('dhruba123', 10),
        isAdmin: false
    },
    {
        name: 'Rahul Dey',
        email: 'rahul@example.com',
        password: bcrypt.hashSync('rahul123', 10),
        isAdmin: false
    }
]