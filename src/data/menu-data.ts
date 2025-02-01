import HomeSvg from "@/svg/HomeSvg";
import PeopleLogo from "@/svg/PeopleLogo";
import SettingSvg from "@/svg/SettingSvg";
import ProductIcon from "@/svg/Products";
import TeamIcon from "@/svg/TeamIcon";
import BlogIcon from "@/svg/BlogIcon";
import UserIcon from "@/svg/UserIcon";
import RefundIcon from "@/svg/RefundIcon";
import PdfIcon from "@/svg/PdfIcon";
import OrderIcon from "@/svg/OrderSvg";




interface MenuItem {
  id: number;
  text: string;
  icon: () => JSX.Element;
  link?: string;
  submenu?: SubMenuItem[];
}

interface SubMenuItem {
  text: string;
  link: string;
}

export const menuData: MenuItem[] = [
  {
    id: 1,
    text: "Asosiy",
    icon: HomeSvg,
    link: "/",
  },
  {
    id: 2,
    text: "Hotel",
    icon: ProductIcon,
    submenu: [
      {
        text: "Hamma mehmonxonalar",
        link: "/services",
      },
      {
        text: "Mehmonxona qo'sish",
        link: "/create-service",
      },
    ],
  },
  // {
  //   id: 3,
  //   text: "Bloglar",
  //   icon: BlogIcon,
  //   submenu: [
  //     {
  //       text: "Bloglar",
  //       link: "/blogs",
  //     },
  //     {
  //       text: "Bloglar yaratish",
  //       link: "/create-blog",
  //     },
  //   ],
  // },
  {
    id: 4,
    text: "Yangiliklar",
    icon: PdfIcon,
    submenu: [
      {
        text: "Hamma yangiliklar",
        link: "/news",
      },
      {
        text: "Yangiliklar yaratish",
        link: "/create-news",
      },
    ],
  },
  {
    id: 5,
    text: "Tourlar",
    icon: OrderIcon,
    submenu: [
      {
        text: "Hamma Tourlar",
        link: "/sources",
      },
      {
        text: "Tourlar yaratish",
        link: "/create-source",
      },
    ],
  },

  {
    id: 6,
    text: "Ichki Tourlar",
    icon: OrderIcon,
    submenu: [
      {
        text: "Hamma Tourlar",
        link: "/tours-product",
      },
      {
        text: "Tourlar yaratish",
        link: "/create-tours",
      },
    ],
  },
  // {
  //   id: 7,
  //   text: "Hududlar bo'yicha",
  //   icon: PdfIcon,
  //   submenu: [
  //     {
  //       text: "Hamma hududlar",
  //       link: "/categories",
  //     },
  //     {
  //       text: "Hududlar yaratish",
  //       link: "/create-categories",
  //     },
  //   ],
  // },

  // {
  //   id: 8,
  //   text: "Mashhur binolar bo'yicha",
  //   icon: PdfIcon,
  //   submenu: [
  //     {
  //       text: "Mashhur binolar",
  //       link: "/products",
  //     },
  //     {
  //       text: "Mashhur binolar yaratish",
  //       link: "/create-products",
  //     },
  //   ],
  // },


];
