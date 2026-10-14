import computerHardware from '../assets/banners/computer-hardware.jpg'
import headphones from '../assets/products/headphones-sony.jpg'
import keyboard from '../assets/products/keyboard-keychron.jpg'
import laptop from '../assets/products/laptop.jpg'
import monitor from '../assets/products/monitor-lg.jpg'
import mouse from '../assets/products/mouse-logitech.jpg'
import smartphone from '../assets/products/smartphone.jpg'
import speaker from '../assets/products/speaker-jbl.jpg'
import tablet from '../assets/products/tablet.jpg'
import webcam from '../assets/products/webcam-logitech.jpg'

const products = [
  {
    id: 1,
    name: 'Laptop ASUS Vivobook 15',
    image: laptop,
    description: 'Laptop 15.6 inch, Intel Core i5, RAM 16GB, SSD 512GB.',
    price: 18990000,
    discount: 10,
    instock: true,
    rating: 4.7,
    category: 'Laptop',
  },
  {
    id: 2,
    name: 'Điện thoại Samsung Galaxy A55',
    image: smartphone,
    description: 'Màn hình Super AMOLED 6.6 inch, camera 50MP, 5G.',
    price: 10990000,
    discount: 8,
    instock: true,
    rating: 4.6,
    category: 'Điện thoại',
  },
  {
    id: 3,
    name: 'Tai nghe Sony WH-1000XM5',
    image: headphones,
    description: 'Tai nghe không dây chống ồn chủ động, pin đến 30 giờ.',
    price: 7990000,
    discount: 12,
    instock: true,
    rating: 4.9,
    category: 'Phụ kiện',
  },
  {
    id: 4,
    name: 'Bàn phím cơ Keychron K8',
    image: keyboard,
    description: 'Bàn phím cơ không dây, layout TKL, hỗ trợ Bluetooth.',
    price: 2290000,
    discount: 5,
    instock: true,
    rating: 4.5,
    category: 'Phụ kiện',
  },
  {
    id: 5,
    name: 'Chuột Logitech MX Master 3S',
    image: mouse,
    description: 'Chuột không dây công thái học, cảm biến 8K DPI.',
    price: 2490000,
    discount: 10,
    instock: false,
    rating: 4.8,
    category: 'Phụ kiện',
  },
  {
    id: 6,
    name: 'Màn hình LG UltraGear 27 inch',
    image: monitor,
    description: 'Màn hình gaming QHD, tần số quét 165Hz, IPS.',
    price: 6990000,
    discount: 15,
    instock: true,
    rating: 4.7,
    category: 'Màn hình',
  },
  {
    id: 7,
    name: 'Máy tính bảng Apple iPad Air',
    image: tablet,
    description: 'Màn hình Liquid Retina 11 inch, chip Apple M2.',
    price: 15990000,
    discount: 7,
    instock: true,
    rating: 4.8,
    category: 'Máy tính bảng',
  },
  {
    id: 8,
    name: 'Ổ cứng SSD Samsung 990 EVO 1TB',
    image: computerHardware,
    description: 'SSD NVMe PCIe, dung lượng 1TB, tốc độ cao.',
    price: 2790000,
    discount: 10,
    instock: true,
    rating: 4.6,
    category: 'Linh kiện máy tính',
  },
  {
    id: 9,
    name: 'Loa Bluetooth JBL Flip 6',
    image: speaker,
    description: 'Loa di động chống nước IP67, thời lượng pin 12 giờ.',
    price: 2990000,
    discount: 10,
    instock: false,
    rating: 4.5,
    category: 'Âm thanh',
  },
  {
    id: 10,
    name: 'Webcam Logitech Brio 4K',
    image: webcam,
    description: 'Webcam Ultra HD 4K, tự động cân chỉnh ánh sáng.',
    price: 4490000,
    discount: 6,
    instock: true,
    rating: 4.4,
    category: 'Phụ kiện',
  },
]

export default products
