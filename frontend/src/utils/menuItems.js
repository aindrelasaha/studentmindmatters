import {home, doctor, mental,} from '../utils/Icons'
export const menuItems = [
    {
        id: 1,
        title: 'Home',
        icon: home,
        link: '/dashboard',
    },
    {   
        id: 2,
        title: "Healing-Bot",
        icon: mental,
        link: '/MentalWellness',
    },
    {
        id: 3,
        title: "Consult Doctor",
        icon: doctor,
        link: '/ConsultDoctor',
    }
]