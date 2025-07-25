const products = [
  {
    id: 1,
    name: "MacBook Pro M3",
    description: "Laptop cao cấp với chip M3 mạnh mẽ, màn hình Retina 14 inch, RAM 16GB, SSD 512GB",
    fullDescription: `MacBook Pro M3 14 inch là chiếc laptop cao cấp được thiết kế dành cho các chuyên gia sáng tạo và người dùng có nhu cầu hiệu năng cao. Với chip M3 thế hệ mới nhất của Apple, máy mang lại hiệu năng vượt trội và khả năng tiết kiệm pin đáng kinh ngạc.

Màn hình Liquid Retina XDR 14.2 inch với độ phân giải 3024 x 1964 pixels mang đến trải nghiệm hình ảnh sống động, màu sắc chính xác và độ tương phản cao. Công nghệ ProMotion với tần số quét lên đến 120Hz đảm bảo mọi thao tác đều mượt mà.

Hệ thống âm thanh 6 loa với công nghệ Spatial Audio tạo ra không gian âm thanh sống động. Camera FaceTime HD 1080p với tính năng Center Stage giúp bạn luôn nằm trong khung hình khi video call.`,
    price: 45000000,
    originalPrice: 50000000,
    image: "https://mac365.vn/wp-content/uploads/2024/03/3-12.png",
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook-pro-16-inch-m3-max-2023_2_.png",
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_562.png",
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_8__2.png",
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook-pro-16-inch-m3-max-2023_8_.png",
    ],
    category: "laptop",
    badge: "Hot",
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    stockQuantity: 15,
    sku: "MBP-M3-14-512",
    brand: "Apple",
    warranty: "12 tháng",
    specifications: {
      "Bộ xử lý": "Apple M3 8-core CPU",
      "Bộ nhớ": "16GB Unified Memory",
      "Lưu trữ": "512GB SSD",
      "Màn hình": "14.2-inch Liquid Retina XDR",
      "Độ phân giải": "3024 x 1964 pixels",
      "Card đồ họa": "10-core GPU",
      Pin: "Lên đến 18 giờ",
      "Trọng lượng": "1.6 kg",
      "Kích thước": "31.26 x 22.12 x 1.55 cm",
      "Hệ điều hành": "macOS Sonoma",
      "Cổng kết nối": "3x Thunderbolt 4, HDMI, SDXC, MagSafe 3",
      Webcam: "1080p FaceTime HD camera",
      "Âm thanh": "6-speaker sound system",
      "Bàn phím": "Magic Keyboard với Touch ID",
    },
    colors: ["Space Gray", "Silver"],
    storage: ["512GB", "1TB", "2TB"],
    memory: ["16GB", "32GB", "64GB"],
    features: ["Touch ID", "MagSafe 3", "Thunderbolt 4", "ProMotion", "Spatial Audio"],
    tags: ["Laptop", "Apple", "M3", "Professional", "Creative"],
  },
  {
    id: 2,
    name: "iPhone 15 Pro Max",
    description: "Điện thoại thông minh cao cấp với camera 48MP và chip A17 Pro, màn hình 6.7 inch",
    fullDescription: `iPhone 15 Pro Max là flagship mới nhất của Apple với thiết kế titanium cao cấp và hiệu năng đột phá từ chip A17 Pro. Màn hình Super Retina XDR 6.7 inch với Dynamic Island mang đến trải nghiệm tương tác hoàn toàn mới.

Hệ thống camera Pro với cảm biến chính 48MP, camera Ultra Wide 12MP và camera Telephoto 12MP với zoom quang học 5x. Tính năng Action Button có thể tùy chỉnh thay thế cho switch im lặng truyền thống.

Cổng USB-C với hỗ trợ USB 3 cho tốc độ truyền dữ liệu nhanh chóng. Pin được cải thiện đáng kể với thời gian sử dụng lên đến 29 giờ xem video.`,
    price: 32000000,
    originalPrice: 35000000,
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_2__5_2_1_1.jpg",
    images: [
      "https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-thumbnew-600x600.jpg",
      "https://i.ytimg.com/vi/QCvcF94NmGs/maxresdefault.jpg",
      "https://hanoicomputercdn.com/media/product/76344_white_titanium__1_.jpg",
    ],
    category: "phone",
    badge: "New",
    rating: 4.9,
    reviewCount: 89,
    inStock: true,
    stockQuantity: 8,
    sku: "IP15PM-256-BTI",
    brand: "Apple",
    warranty: "12 tháng",
    specifications: {
      Chip: "A17 Pro chip",
      "Màn hình": "6.7-inch Super Retina XDR",
      "Độ phân giải": "2796 x 1290 pixels",
      "Camera chính": "48MP Main camera",
      "Camera phụ": "12MP Ultra Wide, 12MP Telephoto",
      Zoom: "5x optical zoom",
      "Lưu trữ": "256GB",
      Pin: "Lên đến 29 giờ video",
      "Chất liệu": "Titanium",
      "5G": "Có",
      "Kháng nước": "IP68",
      "Hệ điều hành": "iOS 17",
      "Cổng sạc": "USB-C",
      "Sạc không dây": "MagSafe, Qi",
    },
    colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
    storage: ["128GB", "256GB", "512GB", "1TB"],
    features: ["Face ID", "Action Button", "Dynamic Island", "MagSafe", "5G"],
    tags: ["iPhone", "Apple", "A17 Pro", "Titanium", "Pro Camera"],
  },
  {
    id: 3,
    name: "AirPods Pro 2",
    description: "Tai nghe không dây với công nghệ chống ồn chủ động, âm thanh không gian",
    fullDescription: `AirPods Pro thế hệ thứ 2 với chip H2 mang đến trải nghiệm âm thanh hoàn toàn mới. Công nghệ Active Noise Cancellation được cải tiến giúp loại bỏ tiếng ồn hiệu quả gấp đôi so với thế hệ trước.

Adaptive Transparency cho phép bạn nghe âm thanh xung quanh một cách tự nhiên. Personalized Spatial Audio với dynamic head tracking tạo ra trải nghiệm âm thanh 3D sống động.

Case sạc MagSafe với loa tích hợp giúp dễ dàng tìm kiếm khi thất lạc. Thời lượng pin lên đến 6 giờ nghe nhạc và 30 giờ với case sạc.`,
    price: 6500000,
    originalPrice: 7000000,
    image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FMT_WHH?wid=750&hei=556&fmt=jpeg&qlt=90&.v=1724041668836",
    images: ["https://media.wired.com/photos/671577232009d044328f83e0/master/w_2560%2Cc_limit/AirPods%2520Pro%25202%2520Abstract%2520Background%2520102024%2520SOURCE%2520Apple.jpg", "https://phukiendidong.com/wp-content/uploads/2022/09/airpods-pro-2nd-generation-1.jpg"],
    category: "accessory",
    badge: "Sale",
    rating: 4.7,
    reviewCount: 256,
    inStock: true,
    stockQuantity: 25,
    sku: "APP2-WHITE",
    brand: "Apple",
    warranty: "12 tháng",
    specifications: {
      Chip: "H2 chip",
      "Pin tai nghe": "Lên đến 6 giờ nghe nhạc",
      "Pin case": "Lên đến 30 giờ tổng cộng",
      "Kết nối": "Bluetooth 5.3",
      "Tính năng": "Active Noise Cancellation",
      "Kháng nước": "IPX4",
      "Trọng lượng": "5.3g mỗi tai",
      "Cảm biến": "Dual beamforming microphones",
      "Điều khiển": "Force sensor",
      Sạc: "Lightning, MagSafe, Qi wireless",
      "Tương thích": "iPhone, iPad, Mac, Apple Watch",
    },
    colors: ["White"],
    features: ["Active Noise Cancellation", "Spatial Audio", "MagSafe", "Find My"],
    tags: ["AirPods", "Wireless", "Noise Cancellation", "H2 Chip"],
  },
  {
    id: 4,
    name: "Dell XPS 13",
    description: "Laptop mỏng nhẹ với màn hình InfinityEdge 13.3 inch, Intel Core i7",
    fullDescription: `Dell XPS 13 là laptop ultrabook cao cấp với thiết kế mỏng nhẹ và hiệu năng mạnh mẽ. Màn hình InfinityEdge 13.4 inch với viền siêu mỏng mang đến trải nghiệm hình ảnh tuyệt vời trong form factor nhỏ gọn.

Bộ xử lý Intel Core i7 thế hệ 13 với kiến trúc hybrid mới mang lại hiệu năng cao và tiết kiệm pin. RAM LPDDR5 16GB và SSD NVMe 512GB đảm bảo tốc độ xử lý nhanh chóng.

Bàn phím có đèn nền với key travel thoải mái. Trackpad precision lớn hỗ trợ đầy đủ gesture của Windows 11. Hệ thống tản nhiệt thông minh giữ máy luôn mát mẻ.`,
    price: 28000000,
    originalPrice: 32000000,
    image: "https://www.laptopvip.vn/images/ab__webp/thumbnails/800/800/detailed/10/71jxN6pEeNL._SL1496_.png.webp",
    images: ["https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop_dell_xps_13_9350_xps9350-u5ia165w11gr-fp_-_1.png", "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop_dell_xps_13_9350_71058714_-_1.png"],
    category: "laptop",
    rating: 4.6,
    reviewCount: 78,
    inStock: true,
    stockQuantity: 12,
    sku: "XPS13-I7-512",
    brand: "Dell",
    warranty: "24 tháng",
    specifications: {
      "Bộ xử lý": "Intel Core i7-1360P",
      "Bộ nhớ": "16GB LPDDR5",
      "Lưu trữ": "512GB SSD NVMe",
      "Màn hình": "13.4-inch FHD+ InfinityEdge",
      "Độ phân giải": "1920 x 1200 pixels",
      "Card đồ họa": "Intel Iris Xe Graphics",
      Pin: "Lên đến 12 giờ",
      "Trọng lượng": "1.24 kg",
      "Kích thước": "29.5 x 19.9 x 1.49 cm",
      "Hệ điều hành": "Windows 11 Home",
      "Cổng kết nối": "2x Thunderbolt 4, microSD",
      Webcam: "720p HD camera",
      "Âm thanh": "Stereo speakers",
      "Bàn phím": "Backlit keyboard",
    },
    colors: ["Platinum Silver", "Graphite"],
    storage: ["512GB", "1TB"],
    memory: ["16GB", "32GB"],
    features: ["InfinityEdge Display", "Thunderbolt 4", "Backlit Keyboard", "Windows Hello"],
    tags: ["Dell", "XPS", "Ultrabook", "Intel", "Portable"],
  },
  {
    id: 5,
    name: "Samsung Galaxy S24 Ultra",
    description: "Flagship Android với S Pen và camera zoom 100x, màn hình Dynamic AMOLED 6.8 inch",
    fullDescription: `Samsung Galaxy S24 Ultra là smartphone flagship cao cấp nhất của Samsung với S Pen tích hợp và hệ thống camera zoom 100x Space Zoom. Màn hình Dynamic AMOLED 2X 6.8 inch với độ sáng lên đến 2600 nits.

Chip Snapdragon 8 Gen 3 for Galaxy được tối ưu riêng mang lại hiệu năng vượt trội. Camera chính 200MP với OIS, camera telephoto periscope 50MP zoom 5x quang học và 100x kỹ thuật số.

S Pen với độ trễ siêu thấp cho trải nghiệm viết và vẽ tự nhiên. Pin 5000mAh với sạc nhanh 45W và sạc không dây 15W. Khung titanium cao cấp với kháng nước IP68.`,
    price: 30000000,
    originalPrice: 33000000,
    image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/s/ss-s24-ultra-xam-222.png",
    images: [
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_s24_ultra_256gb_-_1.png",
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_s24_ultra_256gb_-_2.png",
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_s24_ultra_256gb_-_12_2.png",
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_s24_ultra_1tb_-_13.png"
    ],
    category: "phone",
    badge: "Hot",
    rating: 4.8,
    reviewCount: 145,
    inStock: true,
    stockQuantity: 20,
    sku: "S24U-256-TB",
    brand: "Samsung",
    warranty: "12 tháng",
    specifications: {
      "Bộ xử lý": "Snapdragon 8 Gen 3 for Galaxy",
      "Màn hình": "6.8-inch Dynamic AMOLED 2X",
      "Độ phân giải": "3120 x 1440 pixels",
      "Camera chính": "200MP với OIS",
      "Camera phụ": "50MP Telephoto, 12MP Ultra Wide, 12MP Telephoto",
      Zoom: "100x Space Zoom",
      RAM: "12GB",
      "Lưu trữ": "256GB",
      Pin: "5000mAh",
      Sạc: "45W có dây, 15W không dây",
      "S Pen": "Tích hợp sẵn",
      "Kháng nước": "IP68",
      "Hệ điều hành": "Android 14 với One UI 6.1",
      "5G": "Có",
      "Chất liệu": "Titanium frame",
    },
    colors: ["Titanium Black", "Titanium Gray", "Titanium Violet", "Titanium Yellow"],
    storage: ["256GB", "512GB", "1TB"],
    features: ["S Pen", "100x Zoom", "AI Features", "DeX Mode", "5G"],
    tags: ["Samsung", "Galaxy", "S Pen", "Zoom Camera", "Titanium"],
  },
  {
    id: 6,
    name: "Magic Mouse",
    description: "Chuột không dây với bề mặt cảm ứng đa điểm, thiết kế tối giản",
    fullDescription: `Magic Mouse là chuột không dây cao cấp của Apple với thiết kế tối giản và bề mặt Multi-Touch. Kết nối Bluetooth ổn định với độ trễ thấp, phù hợp cho công việc và giải trí.

Bề mặt cảm ứng hỗ trợ đầy đủ các gesture như scroll, swipe, zoom giúp tăng hiệu quả công việc. Pin lithium-ion tích hợp có thể sử dụng lên đến 1 tháng với một lần sạc.

Thiết kế ergonomic thoải mái cho cả người thuận tay trái và phải. Tương thích hoàn hảo với Mac và iPad, hỗ trợ một số tính năng trên Windows.`,
    price: 2500000,
    originalPrice: 2800000,
    image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MXK53?wid=4000&hei=4000&fmt=jpeg&qlt=90&.v=1730508286345",
    images: ["https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MXK53_AV1?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=QytENXB3MzdYRFA4RU1McS9kQ1d6VlZya2lKWlJmUEwrYndWOTJiVWJWQUYwVmtIbGRkS25RMVpBRlo0bk5DUStteWFnS2JDbkxFb1JqRG5KS1RPUWc",
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MXK53_AV2?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1730508286345",
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MXK53_AV3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1730508286345",
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MXK53_AV4?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1730508286345"
    ],
    category: "accessory",
    rating: 4.3,
    reviewCount: 67,
    inStock: true,
    stockQuantity: 30,
    sku: "MM-WHITE",
    brand: "Apple",
    warranty: "12 tháng",
    specifications: {
      "Kết nối": "Bluetooth 5.0",
      Pin: "Lithium-ion có thể sạc lại",
      "Thời lượng pin": "Lên đến 1 tháng",
      "Tương thích": "Mac, iPad, Windows (hạn chế)",
      "Cảm ứng": "Multi-Touch surface",
      "Trọng lượng": "99g",
      "Kích thước": "11.35 x 5.71 x 2.16 cm",
      "Cảm biến": "Laser tracking",
      DPI: "1300 DPI",
      Sạc: "Lightning cable",
      "Màu sắc": "White, Black",
    },
    colors: ["White", "Black"],
    features: ["Multi-Touch", "Bluetooth", "Rechargeable", "Ambidextrous"],
    tags: ["Apple", "Mouse", "Wireless", "Multi-Touch"],
  },
  {
    id: 7,
    name: "iPad Pro 12.9",
    description: "Máy tính bảng chuyên nghiệp với chip M2 và màn hình Liquid Retina XDR 12.9 inch",
    fullDescription: `iPad Pro 12.9 inch với chip M2 mang đến hiệu năng laptop trong thân hình tablet. Màn hình Liquid Retina XDR 12.9 inch với công nghệ mini-LED cho độ tương phản vô cực và màu sắc chính xác.

Chip M2 8-core CPU và 10-core GPU xử lý mượt mà mọi tác vụ từ chỉnh sửa video 4K đến render 3D. Hỗ trợ Apple Pencil thế hệ 2 với độ trễ siêu thấp cho trải nghiệm vẽ tự nhiên.

Camera TrueDepth với Center Stage và camera sau 12MP với LiDAR Scanner. Kết nối 5G và Wi-Fi 6E cho tốc độ mạng nhanh chóng. Magic Keyboard và Apple Pencil bán riêng.`,
    price: 25000000,
    originalPrice: 28000000,
    image: "https://product.hstatic.net/1000259254/product/ipad_pro_12.9-inch__space_grey_bbfeb3c1a1964da2a34162e6c556616d_master.jpg",
    images: ["https://cdn.tgdd.vn/Products/Images/522/294105/Slider/ipad-pro-m2-12-9-inch638035039263101931.jpg", 
      "https://cdn.tgdd.vn/Products/Images/522/294105/ipad-pro-m2-wifi-bac-2-750x500.jpg",
      "https://cdn.tgdd.vn/Products/Images/522/294105/ipad-pro-m2-wifi-bac-4-750x500.jpg",
    ],
    category: "laptop",
    badge: "New",
    rating: 4.9,
    reviewCount: 92,
    inStock: true,
    stockQuantity: 18,
    sku: "IPP129-M2-128",
    brand: "Apple",
    warranty: "12 tháng",
    specifications: {
      Chip: "Apple M2",
      "Màn hình": "12.9-inch Liquid Retina XDR",
      "Độ phân giải": "2732 x 2048 pixels",
      "Lưu trữ": "128GB",
      "Camera sau": "12MP Wide, 10MP Ultra Wide",
      "Camera trước": "12MP TrueDepth",
      LiDAR: "Có",
      Pin: "Lên đến 10 giờ",
      "Kết nối": "Wi-Fi 6E, 5G (tùy chọn)",
      "Apple Pencil": "Hỗ trợ thế hệ 2",
      Cổng: "Thunderbolt / USB 4",
      "Âm thanh": "4 speakers",
      "Trọng lượng": "682g (Wi-Fi)",
      "Hệ điều hành": "iPadOS 17",
    },
    colors: ["Space Gray", "Silver"],
    storage: ["128GB", "256GB", "512GB", "1TB", "2TB"],
    connectivity: ["Wi-Fi", "Wi-Fi + Cellular"],
    features: ["M2 Chip", "Liquid Retina XDR", "Apple Pencil", "5G", "LiDAR"],
    tags: ["iPad", "Pro", "M2", "Tablet", "Creative"],
  },
  {
    id: 8,
    name: "Sony WH-1000XM5",
    description: "Tai nghe chụp tai cao cấp với chống ồn hàng đầu, âm thanh Hi-Res",
    fullDescription: `Sony WH-1000XM5 là tai nghe chống ồn hàng đầu thế giới với công nghệ V1 processor và dual noise sensor. Thiết kế mới nhẹ hơn và thoải mái hơn cho việc đeo lâu dài.

Driver 30mm mới được thiết kế đặc biệt cho âm thanh Hi-Res với dải tần rộng. Công nghệ DSEE Extreme nâng cấp chất lượng âm thanh kỹ thuật số lên gần Hi-Res.

Pin 30 giờ với sạc nhanh 3 phút cho 3 giờ sử dụng. Multipoint connection kết nối đồng thời 2 thiết bị. Speak-to-Chat tự động tạm dừng nhạc khi bạn nói chuyện.`,
    price: 8500000,
    originalPrice: 9500000,
    image: "https://www.sony.com.vn/image/6145c1d32e6ac8e63a46c912dc33c5bb?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF",
    images: ["https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_172_2.png", 
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/a/tai-nghe-chup-tai-sony-wh-1000xm5-ksp-2.png"],
    category: "accessory",
    badge: "Sale",
    rating: 4.8,
    reviewCount: 189,
    inStock: true,
    stockQuantity: 22,
    sku: "WH1000XM5-B",
    brand: "Sony",
    warranty: "12 tháng",
    specifications: {
      Driver: "30mm dynamic drivers",
      "Chống ồn": "Industry-leading với V1 processor",
      Pin: "Lên đến 30 giờ",
      "Sạc nhanh": "3 phút = 3 giờ sử dụng",
      "Kết nối": "Bluetooth 5.2",
      Codec: "LDAC, SBC, AAC",
      "Trọng lượng": "250g",
      "Tần số": "4Hz - 40kHz",
      Microphone: "Dual noise sensor",
      "Điều khiển": "Touch control",
      "Tính năng": "Speak-to-Chat, Quick Attention",
      App: "Sony Headphones Connect",
    },
    colors: ["Black", "Silver"],
    features: ["Noise Cancelling", "Hi-Res Audio", "30H Battery", "Quick Charge", "Multipoint"],
    tags: ["Sony", "Headphones", "Noise Cancelling", "Hi-Res", "Wireless"],
  },
]

// Sample reviews data
const reviews = {
  1: [
    {
      id: 1,
      userName: "Nguyễn Văn A",
      rating: 5,
      date: "2024-01-15",
      content: "Sản phẩm tuyệt vời! Hiệu năng mạnh mẽ, thiết kế đẹp. Rất hài lòng với việc mua hàng.",
      helpful: 12,
      reported: 0,
    },
    {
      id: 2,
      userName: "Trần Thị B",
      rating: 4,
      date: "2024-01-10",
      content: "Chất lượng tốt, giao hàng nhanh. Giá hơi cao nhưng xứng đáng.",
      helpful: 8,
      reported: 0,
    },
  ],
  2: [
    {
      id: 3,
      userName: "Lê Văn C",
      rating: 5,
      date: "2024-01-12",
      content: "Camera cực kỳ ấn tượng! Chụp ảnh đẹp, quay video mượt mà.",
      helpful: 15,
      reported: 0,
    },
  ],
}

// Coupon codes
const coupons = {
  WELCOME10: { discount: 0.1, minOrder: 1000000, description: "Giảm 10% cho đơn hàng từ 1 triệu" },
  SAVE50K: { discount: 50000, minOrder: 2000000, description: "Giảm 50K cho đơn hàng từ 2 triệu" },
  NEWUSER: { discount: 0.15, minOrder: 500000, description: "Giảm 15% cho khách hàng mới" },
  FLASH20: { discount: 0.2, minOrder: 3000000, description: "Flash sale - Giảm 20%" },
}

// Global variables
let cart = JSON.parse(localStorage.getItem("cart")) || []
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || []
let compareList = JSON.parse(localStorage.getItem("compareList")) || []
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null
const users = JSON.parse(localStorage.getItem("users")) || []
const orders = JSON.parse(localStorage.getItem("orders")) || []
let currentTheme = localStorage.getItem("theme") || "light"
let currentView = "grid"
let currentFilter = "all"
let currentSort = "default"
let displayedProducts = 8
let appliedCoupon = null

// DOM elements
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const searchInput = document.getElementById("search-input")
const searchSuggestions = document.getElementById("search-suggestions")
const productsGrid = document.getElementById("products-grid")
const cartModal = document.getElementById("cart-modal")
const wishlistModal = document.getElementById("wishlist-modal")
const cartItems = document.getElementById("cart-items")
const wishlistItems = document.getElementById("wishlist-items")
const cartCount = document.getElementById("cart-count")
const wishlistCount = document.getElementById("wishlist-count")
const cartTotal = document.getElementById("cart-total")
const cartSubtotal = document.getElementById("cart-subtotal")
const discountAmount = document.getElementById("discount-amount")
const discountLine = document.getElementById("discount-line")
const productModal = document.getElementById("product-modal")
const productDetail = document.getElementById("product-detail")
const authModal = document.getElementById("auth-modal")
const checkoutModal = document.getElementById("checkout-modal")
const loading = document.getElementById("loading")
const backToTop = document.getElementById("back-to-top")
const contactForm = document.getElementById("contact-form")
const themeIcon = document.getElementById("theme-icon")
const userAvatar = document.getElementById("user-avatar")
const userDropdown = document.getElementById("user-dropdown")
const userInfo = document.getElementById("user-info")
const authButtons = document.getElementById("auth-buttons")
const userMenuItems = document.getElementById("user-menu-items")
const userName = document.getElementById("user-name")
const userEmail = document.getElementById("user-email")
const userPoints = document.getElementById("user-points")
const chatWindow = document.getElementById("chat-window")
const chatMessages = document.getElementById("chat-messages")
const chatInputField = document.getElementById("chat-input-field")
const loadMoreBtn = document.getElementById("load-more-btn")
const compareSection = document.getElementById("compare-section")
const compareProducts = document.getElementById("compare-products")

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()

  // Add event listeners for user account modal tabs
  const tabProfileBtn = document.getElementById('tab-profile-btn')
  const tabOrdersBtn = document.getElementById('tab-orders-btn')
  const tabSettingsBtn = document.getElementById('tab-settings-btn')

  if (tabProfileBtn) {
    tabProfileBtn.addEventListener('click', () => {
      showUserAccountTab('profile')
    })
  }
  if (tabOrdersBtn) {
    tabOrdersBtn.addEventListener('click', () => {
      showUserAccountTab('orders')
    })
  }
  if (tabSettingsBtn) {
    tabSettingsBtn.addEventListener('click', () => {
      showUserAccountTab('settings')
    })
  }
})

function initializeApp() {
  applyTheme(currentTheme)
  displayProducts(getFilteredProducts())
  updateCartUI()
  updateWishlistUI()
  updateUserUI()
  setupEventListeners()
  setupScrollEffects()
  startCountdown()
  initializeSearch()

  // Show welcome message for new users
  if (!localStorage.getItem("hasVisited")) {
    setTimeout(() => {
      showNotification("Chào mừng đến với TechStore! 🎉", "info", "Khám phá những sản phẩm công nghệ tuyệt vời")
      localStorage.setItem("hasVisited", "true")
    }, 1000)
  }
}

// Theme Management
function toggleTheme() {
  currentTheme = currentTheme === "light" ? "dark" : "light"
  applyTheme(currentTheme)
  localStorage.setItem("theme", currentTheme)
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme)
  const icon = document.getElementById("theme-icon")
  if (icon) {
    icon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun"
  }
}

// Event Listeners Setup
function setupEventListeners() {
  // Mobile menu toggle
  hamburger?.addEventListener("click", (e) => {
    e.stopPropagation()
    navMenu.classList.toggle("active")
    hamburger.classList.toggle("active")
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-container")) {
      navMenu.classList.remove("active")
      hamburger.classList.remove("active")
    }
  })

  // Close mobile menu when clicking on links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      hamburger.classList.remove("active")
    })
  })

  // Search functionality with debounce
  let searchTimeout
  searchInput?.addEventListener("input", (e) => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => handleSearch(e), 300)
  })

  searchInput?.addEventListener("focus", () => {
    if (searchInput.value.length >= 2) {
      showSearchSuggestions(searchInput.value.toLowerCase().trim())
    }
  })

  // Close search suggestions when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-container")) {
      hideSearchSuggestions()
    }
  })

  // Prevent form submission on Enter in search
  searchInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      hideSearchSuggestions()
    }
  })

  // Rest of event listeners...
  // Filter and sort
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", handleFilter)
  })

  document.getElementById("sort-select")?.addEventListener("change", handleSort)
  document.getElementById("min-price")?.addEventListener("input", debounce(handlePriceFilter, 500))
  document.getElementById("max-price")?.addEventListener("input", debounce(handlePriceFilter, 500))

  // View toggle
  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const view = e.target.closest(".view-btn").dataset.view
      toggleView(view)
    })
  })

  // Contact form
  contactForm?.addEventListener("submit", handleContactForm)

  // Chat functionality
  chatInputField?.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  })

  // Close modals when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === cartModal) toggleCart()
    if (e.target === wishlistModal) toggleWishlist()
    if (e.target === productModal) closeProductModal()
    if (e.target === authModal) closeAuthModal()
    if (e.target === checkoutModal) closeCheckoutModal()

    // Close user dropdown when clicking outside
    if (!e.target.closest(".user-menu")) {
      if (userDropdown) userDropdown.style.display = "none"
    }
  })

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Debounce function for better performance
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Scroll Effects
function setupScrollEffects() {
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset

    // Header background on scroll
    const header = document.querySelector(".header")
    if (scrollTop > 100) {
      header.style.background = currentTheme === "light" ? "rgba(255, 255, 255, 0.98)" : "rgba(17, 24, 39, 0.98)"
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
    } else {
      header.style.background = currentTheme === "light" ? "rgba(255, 255, 255, 0.95)" : "rgba(17, 24, 39, 0.95)"
      header.style.boxShadow = "none"
    }

    // Back to top button
    if (scrollTop > 500) {
      backToTop.style.display = "flex"
    } else {
      backToTop.style.display = "none"
    }

    // Parallax effect for hero section
    const hero = document.querySelector(".hero")
    if (hero) {
      hero.style.transform = `translateY(${scrollTop * 0.3}px)`
    }
  })
}

// Search Functionality
function initializeSearch() {
  // Create search index for better performance
  window.searchIndex = products.map((product) => ({
    id: product.id,
    searchText: `${product.name} ${product.description} ${product.category}`.toLowerCase(),
  }))
}

function handleSearch(e) {
  const searchTerm = e.target.value.toLowerCase().trim()

  if (searchTerm.length === 0) {
    hideSearchSuggestions()
    displayProducts(getFilteredProducts())
    return
  }

  // Show suggestions
  if (searchTerm.length >= 2) {
    showSearchSuggestions(searchTerm)
  }

  // Filter products
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm),
  )

  displayProducts(filteredProducts)

  // Show loading animation
  showLoading()
  setTimeout(hideLoading, 300)
}

function showSearchSuggestions(searchTerm = "") {
  if (!searchTerm || searchTerm.length < 2) {
    searchSuggestions.style.display = "none"
    return
  }

  const suggestions = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm),
    )
    .slice(0, 5)

  if (suggestions.length === 0) {
    searchSuggestions.innerHTML = `
      <div class="suggestion-item" style="justify-content: center; color: var(--text-secondary);">
        Không tìm thấy sản phẩm nào
      </div>
    `
    searchSuggestions.style.display = "block"
    return
  }

  searchSuggestions.innerHTML = suggestions
    .map(
      (product) => `
        <div class="suggestion-item" onclick="selectSuggestion('${product.name.replace(/'/g, "\\'")}')">
          <div>
            <strong>${product.name}</strong>
            <div style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 0.25rem;">
              ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </div>
          </div>
          <div style="font-weight: 600; color: var(--accent-color);">
            ${formatPrice(product.price)}
          </div>
        </div>
      `,
    )
    .join("")

  searchSuggestions.style.display = "block"
}

function selectSuggestion(productName) {
  searchInput.value = productName
  hideSearchSuggestions()
  handleSearch({ target: { value: productName } })
}

function hideSearchSuggestions(e) {
  if (!e || !e.target.closest(".search-container")) {
    searchSuggestions.style.display = "none"
  }
}

// Product Display and Filtering
function getFilteredProducts() {
  let filtered = products

  // Apply category filter
  if (currentFilter !== "all") {
    filtered = filtered.filter((product) => product.category === currentFilter)
  }

  // Apply price filter
  const minPrice = Number.parseInt(document.getElementById("min-price")?.value || 0)
  const maxPrice = Number.parseInt(document.getElementById("max-price")?.value || 50000000)
  filtered = filtered.filter((product) => product.price >= minPrice && product.price <= maxPrice)

  // Apply sorting
  switch (currentSort) {
    case "price-low":
      filtered.sort((a, b) => a.price - b.price)
      break
    case "price-high":
      filtered.sort((a, b) => b.price - a.price)
      break
    case "name":
      filtered.sort((a, b) => a.name.localeCompare(b.name))
      break
    case "rating":
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
      break
    default:
      // Keep original order
      break
  }

  return filtered
}

function displayProducts(productsToShow) {
  const productsToDisplay = productsToShow.slice(0, displayedProducts)
  productsGrid.innerHTML = ""

  if (productsToDisplay.length === 0) {
    productsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                <h3>Không tìm thấy sản phẩm nào</h3>
                <p style="color: var(--text-secondary);">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
            </div>
        `
    loadMoreBtn.style.display = "none"
    return
  }

  productsToDisplay.forEach((product) => {
    const productCard = createProductCard(product)
    productsGrid.appendChild(productCard)
  })

  // Show/hide load more button
  loadMoreBtn.style.display = productsToShow.length > displayedProducts ? "block" : "none"

  // Add animation to product cards
  animateProductCards()
}

function createProductCard(product) {
  const card = document.createElement("div")
  card.className = `product-card ${currentView === "list" ? "list-view" : ""}`
  card.setAttribute("data-category", product.category)

  const discountPercent = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0

  const isInWishlist = wishlist.some((item) => item.id === product.id)
  const isInCompare = compareList.some((item) => item.id === product.id)

  card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ""}
            <div class="product-actions-overlay">
                <button class="action-btn" onclick="toggleWishlistItem(${product.id})" title="${isInWishlist ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"}">
                    <i class="fas fa-heart ${isInWishlist ? "text-red-500" : ""}"></i>
                </button>
                <button class="action-btn" onclick="toggleCompareItem(${product.id})" title="${isInCompare ? "Xóa khỏi so sánh" : "Thêm vào so sánh"}">
                    <i class="fas fa-balance-scale ${isInCompare ? "text-blue-500" : ""}"></i>
                </button>
                <button class="action-btn" onclick="quickView(${product.id})" title="Xem nhanh">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            ${
              product.rating
                ? `
                <div class="product-rating">
                    <div class="stars">
                        ${generateStars(product.rating)}
                    </div>
                    <span class="rating-text">(${product.reviewCount || 0} đánh giá)</span>
                </div>
            `
                : ""
            }
            <div class="product-price" style="font-size: 0.95rem;">
                <span class="current-price" style="font-size: 1.2rem;">${formatPrice(product.price)}</span>
                ${
                  product.originalPrice
                    ? `
                    <span class="original-price" style="font-size: 1.2rem;">${formatPrice(product.originalPrice)}</span>
                    <span class="discount-percent" style="font-size: 1rem;">-${discountPercent}%</span>
                `
                    : ""
                }
            </div>
            <div class="product-actions">
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Thêm vào giỏ
                </button>
                <button class="view-details" onclick="viewProductDetails(${product.id})">
                    <i class="fas fa-eye"></i> Chi tiết
                </button>
            </div>
        </div>
    `

  return card
}

function generateStars(rating) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  let starsHTML = ""

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i class="fas fa-star star"></i>'
  }

  // Half star
  if (hasHalfStar) {
    starsHTML += '<i class="fas fa-star-half-alt star"></i>'
  }

  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<i class="far fa-star star empty"></i>'
  }

  return starsHTML
}

function animateProductCards() {
  const cards = document.querySelectorAll(".product-card")
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 100)
      }
    })
  })

  cards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "all 0.6s ease"
    observer.observe(card)
  })
}

// Filter and Sort Functions
function handleFilter(e) {
  currentFilter = e.target.getAttribute("data-filter")
  displayedProducts = 8 // Reset displayed products count

  // Update active filter button
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  e.target.classList.add("active")

  displayProducts(getFilteredProducts())
  showLoading()
  setTimeout(hideLoading, 300)
}

function handleSort(e) {
  currentSort = e.target.value
  displayProducts(getFilteredProducts())
  showLoading()
  setTimeout(hideLoading, 300)
}

function handlePriceFilter() {
  const minPrice = Number.parseInt(document.getElementById("min-price").value)
  const maxPrice = Number.parseInt(document.getElementById("max-price").value)

  document.getElementById("min-price-display").textContent = formatPrice(minPrice)
  document.getElementById("max-price-display").textContent = formatPrice(maxPrice)

  displayProducts(getFilteredProducts())
}

function toggleView(view) {
  currentView = view

  // Update active view button
  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  document.querySelector(`[data-view="${view}"]`).classList.add("active")

  // Update products grid class
  productsGrid.className = `products-grid ${view === "list" ? "list-view" : ""}`

  displayProducts(getFilteredProducts())
}

function loadMoreProducts() {
  displayedProducts += 8
  displayProducts(getFilteredProducts())
}

// Cart Management
function addToCart(productId, quantity = 1) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.push({
      ...product,
      quantity: quantity,
      selectedColor: product.colors?.[0] || null,
      selectedSize: product.sizes?.[0] || null,
    })
  }

  updateCartUI()
  saveCart()
  showNotification(`${product.name} đã được thêm vào giỏ hàng!`, "success")

  // Add points for user
  if (currentUser) {
    addUserPoints(Math.floor(product.price / 100000))
  }
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId)
  updateCartUI()
  saveCart()
  showNotification("Đã xóa sản phẩm khỏi giỏ hàng", "info")
}

function updateQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId)
  if (!item) return

  item.quantity += change

  if (item.quantity <= 0) {
    removeFromCart(productId)
  } else {
    updateCartUI()
    saveCart()
  }
}

function updateCartUI() {
  // Update cart count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  if (cartCount) {
    cartCount.textContent = totalItems
    cartCount.style.display = totalItems > 0 ? "flex" : "none"
  }

  // Update cart items
  if (!cartItems) return

  cartItems.innerHTML = ""

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--text-secondary);">
        <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
        <h3 style="margin-bottom: 1rem; color: var(--text-primary);">Giỏ hàng trống</h3>
        <p style="margin-bottom: 1.5rem;">Thêm sản phẩm để bắt đầu mua sắm</p>
        <button onclick="toggleCart(); scrollToProducts();" 
                style="padding: 0.75rem 1.5rem; background: var(--primary-color); color: white; border: none; border-radius: 25px; cursor: pointer; font-weight: 500; transition: var(--transition);">
          Khám phá sản phẩm
        </button>
      </div>
    `
  } else {
    cart.forEach((item) => {
      const cartItem = document.createElement("div")
      cartItem.className = "cart-item"
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" onerror="this.src='/placeholder.svg?height=80&width=80'">
        <div class="cart-item-info">
          <div class="cart-item-title" title="${item.name}">${item.name}</div>
          <div class="cart-item-price">${formatPrice(item.price)}</div>
          ${item.selectedColor ? `<div style="font-size: 0.875rem; color: var(--text-secondary);">Màu: ${item.selectedColor}</div>` : ""}
          ${item.selectedSize ? `<div style="font-size: 0.875rem; color: var(--text-secondary);">Size: ${item.selectedSize}</div>` : ""}
          <div class="quantity-controls">
            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)" title="Giảm số lượng">-</button>
            <span class="quantity-display">${item.quantity}</span>
            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)" title="Tăng số lượng">+</button>
          </div>
        </div>
        <div class="remove-item" onclick="removeFromCart(${item.id})" title="Xóa sản phẩm">
          <i class="fas fa-trash"></i>
        </div>
      `
      cartItems.appendChild(cartItem)
    })
  }

  updateCartTotals()
}

function updateCartTotals() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  let discount = 0

  if (appliedCoupon) {
    if (typeof appliedCoupon.discount === "number" && appliedCoupon.discount < 1) {
      discount = subtotal * appliedCoupon.discount
    } else {
      discount = appliedCoupon.discount
    }
  }

  const total = subtotal - discount

  if (cartSubtotal) cartSubtotal.textContent = formatPrice(subtotal)
  if (cartTotal) cartTotal.textContent = formatPrice(total)

  if (discountAmount && discountLine) {
    if (discount > 0) {
      discountAmount.textContent = `-${formatPrice(discount)}`
      discountLine.style.display = "flex"
    } else {
      discountLine.style.display = "none"
    }
  }
}

function applyCoupon() {
  const couponInput = document.getElementById("coupon-input")
  if (!couponInput) return

  const couponCode = couponInput.value.trim().toUpperCase()

  if (!couponCode) {
    showNotification("Vui lòng nhập mã giảm giá", "warning")
    couponInput.focus()
    return
  }

  if (cart.length === 0) {
    showNotification("Giỏ hàng trống, không thể áp dụng mã giảm giá", "warning")
    return
  }

  const coupon = coupons[couponCode]
  if (!coupon) {
    showNotification("Mã giảm giá không hợp lệ hoặc đã hết hạn", "error")
    couponInput.focus()
    couponInput.select()
    return
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  if (subtotal < coupon.minOrder) {
    showNotification(`Đơn hàng tối thiểu ${formatPrice(coupon.minOrder)} để sử dụng mã này`, "warning")
    return
  }

  if (appliedCoupon && appliedCoupon === coupon) {
    showNotification("Mã giảm giá này đã được áp dụng", "info")
    return
  }

  appliedCoupon = coupon
  updateCartTotals()
  couponInput.value = ""
  showNotification(`Áp dụng thành công: ${coupon.description}`, "success")
}

function toggleCart() {
  const isVisible = cartModal.style.display === "block"
  cartModal.style.display = isVisible ? "none" : "block"
  document.body.style.overflow = isVisible ? "auto" : "hidden"
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart))
}

// Wishlist Management
function toggleWishlistItem(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  const existingIndex = wishlist.findIndex((item) => item.id === productId)

  if (existingIndex > -1) {
    wishlist.splice(existingIndex, 1)
    showNotification(`${product.name} đã được xóa khỏi danh sách yêu thích`, "info")
  } else {
    wishlist.push(product)
    showNotification(`${product.name} đã được thêm vào danh sách yêu thích`, "success")
  }

  updateWishlistUI()
  saveWishlist()

  // Update product card display
  displayProducts(getFilteredProducts())
}

function updateWishlistUI() {
  wishlistCount.textContent = wishlist.length

  if (!wishlistItems) return

  wishlistItems.innerHTML = ""

  if (wishlist.length === 0) {
    wishlistItems.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                <i class="fas fa-heart" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <h3>Danh sách yêu thích trống</h3>
                <p>Thêm sản phẩm yêu thích để xem sau</p>
            </div>
        `
  } else {
    wishlist.forEach((item) => {
      const wishlistItem = document.createElement("div")
      wishlistItem.className = "wishlist-item"
      wishlistItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="wishlist-item-info">
                    <div class="wishlist-item-title">${item.name}</div>
                    <div class="wishlist-item-price">${formatPrice(item.price)}</div>
                    <div class="wishlist-item-actions">
                        <button class="add-to-cart-from-wishlist" onclick="addToCart(${item.id}); removeFromWishlist(${item.id});">
                            <i class="fas fa-cart-plus"></i> Thêm vào giỏ
                        </button>
                        <button class="remove-from-wishlist" onclick="removeFromWishlist(${item.id})">
                            <i class="fas fa-trash"></i> Xóa
                        </button>
                    </div>
                </div>
            `
      wishlistItems.appendChild(wishlistItem)
    })
  }
}

function removeFromWishlist(productId) {
  wishlist = wishlist.filter((item) => item.id !== productId)
  updateWishlistUI()
  saveWishlist()
  displayProducts(getFilteredProducts())
}

function toggleWishlist() {
  const isVisible = wishlistModal.style.display === "block"
  wishlistModal.style.display = isVisible ? "none" : "block"
  document.body.style.overflow = isVisible ? "auto" : "hidden"
}

function saveWishlist() {
  localStorage.setItem("wishlist", JSON.stringify(wishlist))
}

// Compare Management
function toggleCompareItem(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  const existingIndex = compareList.findIndex((item) => item.id === productId)

  if (existingIndex > -1) {
    compareList.splice(existingIndex, 1)
    showNotification(`${product.name} đã được xóa khỏi danh sách so sánh`, "info")
  } else {
    if (compareList.length >= 3) {
      showNotification("Chỉ có thể so sánh tối đa 3 sản phẩm", "warning")
      return
    }
    compareList.push(product)
    showNotification(`${product.name} đã được thêm vào danh sách so sánh`, "success")
  }

  updateCompareUI()
  saveCompareList()
  displayProducts(getFilteredProducts())
}

function updateCompareUI() {
  if (compareList.length > 0) {
    compareSection.style.display = "block"
    compareProducts.innerHTML = ""

    compareList.forEach((product) => {
      const compareItem = document.createElement("div")
      compareItem.className = "compare-item"
      compareItem.innerHTML = `
                <div style="position: relative;">
                    <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">
                    <button onclick="removeFromCompare(${product.id})" style="position: absolute; top: 10px; right: 10px; background: var(--accent-color); color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <h3>${product.name}</h3>
                <div style="color: var(--accent-color); font-weight: 600; margin: 0.5rem 0;">${formatPrice(product.price)}</div>
                ${
                  product.rating
                    ? `
                    <div style="margin-bottom: 1rem;">
                        ${generateStars(product.rating)} (${product.reviewCount || 0})
                    </div>
                `
                    : ""
                }
                <div style="font-size: 0.875rem; color: var(--text-secondary);">
                    ${Object.entries(product.specifications || {})
                      .slice(0, 5)
                      .map(
                        ([key, value]) =>
                          `<div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                            <span>${key}:</span>
                            <span>${value}</span>
                        </div>`,
                      )
                      .join("")}
                </div>
                <button onclick="addToCart(${product.id})" style="width: 100%; margin-top: 1rem; padding: 0.75rem; background: var(--primary-color); color: white; border: none; border-radius: 8px; cursor: pointer;">
                    Thêm vào giỏ
                </button>
            `
      compareProducts.appendChild(compareItem)
    })
  } else {
    compareSection.style.display = "none"
  }
}

function removeFromCompare(productId) {
  compareList = compareList.filter((item) => item.id !== productId)
  updateCompareUI()
  saveCompareList()
  displayProducts(getFilteredProducts())
}

function saveCompareList() {
  localStorage.setItem("compareList", JSON.stringify(compareList))
}

// Get related products
function getRelatedProducts(currentProductId, category, limit = 4) {
  return products.filter((product) => product.id !== currentProductId && product.category === category).slice(0, limit)
}

// Product Detail Modal - REDESIGNED
function viewProductDetails(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  const productReviews = reviews[productId] || []
  const averageRating =
    productReviews.length > 0
      ? productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length
      : product.rating || 0

  const isInWishlist = wishlist.some((item) => item.id === product.id)
  const relatedProducts = getRelatedProducts(product.id, product.category)

  productDetail.innerHTML = `
    <div class="product-detail-header">
      <div class="product-breadcrumb">
        <span>Trang chủ</span> <i class="fas fa-chevron-right"></i> 
        <span>${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span> <i class="fas fa-chevron-right"></i> 
        <span>${product.name}</span>
      </div>
      <div class="product-sku-brand">
        <span class="product-sku">SKU: ${product.sku}</span>
        <span class="product-brand">Thương hiệu: <strong>${product.brand}</strong></span>
      </div>
    </div>

    <div class="product-detail-main">
      <div class="product-detail-images">
        <div class="main-image-container">
          <img src="${product.image}" alt="${product.name}" id="main-product-image">
          <button class="wishlist-btn ${isInWishlist ? "active" : ""}" onclick="toggleWishlistItem(${product.id})" title="${isInWishlist ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"}">
            <i class="fas fa-heart"></i>
          </button>
        </div>
        ${
          product.images && product.images.length > 1
            ? `
            <div class="product-gallery">
              ${product.images
                .map(
                  (img, index) => `
                  <img src="${img}" alt="${product.name}" class="gallery-thumb ${index === 0 ? "active" : ""}" 
                       onclick="changeMainImage('${img}', this)">
              `,
                )
                .join("")}
            </div>
          `
            : ""
        }
      </div>
      
      <div class="product-detail-info">
        <h1 class="product-title">${product.name}</h1>
        
        <div class="product-meta">
          <div class="product-rating-meta">
            <div class="stars">${generateStars(averageRating)}</div>
            <span class="rating-score">${averageRating.toFixed(1)}</span>
            <span class="rating-count">(${productReviews.length} đánh giá)</span>
          </div>
          <div class="product-stock">
            <span class="stock-status ${product.inStock ? "in-stock" : "out-of-stock"}">
              <i class="fas ${product.inStock ? "fa-check-circle" : "fa-times-circle"}"></i>
              ${product.inStock ? `Còn ${product.stockQuantity} sản phẩm` : "Hết hàng"}
            </span>
          </div>
        </div>
        
        <div class="product-price-section">
          <div class="price-main">
            <span class="current-price">${formatPrice(product.price)}</span>
            ${
              product.originalPrice
                ? `
                <span class="original-price">${formatPrice(product.originalPrice)}</span>
                <span class="discount-badge">-${Math.round((1 - product.price / product.originalPrice) * 100)}%</span>
              `
                : ""
            }
          </div>
          <div class="price-info">
            <span class="warranty-info"><i class="fas fa-shield-alt"></i> Bảo hành ${product.warranty}</span>
            <span class="shipping-info"><i class="fas fa-truck"></i> Miễn phí vận chuyển</span>
          </div>
        </div>

        <div class="product-description-short">
          <p>${product.description}</p>
        </div>

        <div class="product-features">
          <h4>Tính năng nổi bật:</h4>
          <div class="features-list">
            ${(product.features || []).map((feature) => `<span class="feature-tag"><i class="fas fa-check"></i> ${feature}</span>`).join("")}
          </div>
        </div>
        
        <div class="product-options-section">
          ${
            product.colors && product.colors.length > 1
              ? `
              <div class="option-group">
                <label class="option-label">Màu sắc:</label>
                <div class="color-options">
                  ${product.colors
                    .map(
                      (color, index) => `
                      <button class="color-option ${index === 0 ? "active" : ""}" 
                              onclick="selectOption(this, 'color', '${color}')"
                              title="${color}">
                        <span class="color-name">${color}</span>
                      </button>
                  `,
                    )
                    .join("")}
                </div>
              </div>
            `
              : ""
          }
          
          ${
            product.storage && product.storage.length > 1
              ? `
              <div class="option-group">
                <label class="option-label">Dung lượng:</label>
                <div class="storage-options">
                  ${product.storage
                    .map(
                      (storage, index) => `
                      <button class="storage-option ${index === 0 ? "active" : ""}" 
                              onclick="selectOption(this, 'storage', '${storage}')">
                        ${storage}
                      </button>
                  `,
                    )
                    .join("")}
                </div>
              </div>
            `
              : ""
          }

          ${
            product.memory && product.memory.length > 1
              ? `
              <div class="option-group">
                <label class="option-label">RAM:</label>
                <div class="memory-options">
                  ${product.memory
                    .map(
                      (memory, index) => `
                      <button class="memory-option ${index === 0 ? "active" : ""}" 
                              onclick="selectOption(this, 'memory', '${memory}')">
                        ${memory}
                      </button>
                  `,
                    )
                    .join("")}
                </div>
              </div>
            `
              : ""
          }

          ${
            product.connectivity && product.connectivity.length > 1
              ? `
              <div class="option-group">
                <label class="option-label">Kết nối:</label>
                <div class="connectivity-options">
                  ${product.connectivity
                    .map(
                      (conn, index) => `
                      <button class="connectivity-option ${index === 0 ? "active" : ""}" 
                              onclick="selectOption(this, 'connectivity', '${conn}')">
                        ${conn}
                      </button>
                  `,
                    )
                    .join("")}
                </div>
              </div>
            `
              : ""
          }
        </div>
        
        <div class="product-actions-section">
          <div class="quantity-section">
            <label class="quantity-label">Số lượng:</label>
            <div class="quantity-selector">
              <button onclick="changeQuantity(-1)" class="quantity-btn">−</button>
              <input type="number" id="product-quantity" value="1" min="1" max="${product.stockQuantity || 10}">
              <button onclick="changeQuantity(1)" class="quantity-btn">+</button>
            </div>
          </div>
          
          <div class="action-buttons">
            <button class="btn-add-cart ${!product.inStock ? "disabled" : ""}" 
                    onclick="addToCartFromDetail(${product.id})" 
                    ${!product.inStock ? "disabled" : ""}"
                    onclick="addToCartFromDetail(${product.id})"
                    ${!product.inStock ? "disabled" : ""}>
              <i class="fas fa-cart-plus"></i>
              ${product.inStock ? "Thêm vào giỏ hàng" : "Hết hàng"}
            </button>
            <button class="btn-buy-now ${!product.inStock ? "disabled" : ""}"
                    onclick="buyNow(${product.id})"
                    ${!product.inStock ? "disabled" : ""}>
              <i class="fas fa-bolt"></i>
              Mua ngay
            </button>
          </div>
        </div>

        <div class="product-services">
          <div class="service-item">
            <i class="fas fa-truck"></i>
            <div>
              <strong>Giao hàng miễn phí</strong>
              <span>Đơn hàng từ 500k</span>
            </div>
          </div>
          <div class="service-item">
            <i class="fas fa-undo"></i>
            <div>
              <strong>Đổi trả 30 ngày</strong>
              <span>Miễn phí đổi trả</span>
            </div>
          </div>
          <div class="service-item">
            <i class="fas fa-shield-alt"></i>
            <div>
              <strong>Bảo hành ${product.warranty}</strong>
              <span>Chính hãng toàn quốc</span>
            </div>
          </div>
          <div class="service-item">
            <i class="fas fa-headset"></i>
            <div>
              <strong>Hỗ trợ 24/7</strong>
              <span>Tư vấn miễn phí</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="product-detail-tabs">
      <div class="tab-navigation">
        <button class="tab-btn active" onclick="showDetailTab('description')">
          <i class="fas fa-align-left"></i> Mô tả chi tiết
        </button>
        <button class="tab-btn" onclick="showDetailTab('specifications')">
          <i class="fas fa-cogs"></i> Thông số kỹ thuật
        </button>
        <button class="tab-btn" onclick="showDetailTab('reviews')">
          <i class="fas fa-star"></i> Đánh giá (${productReviews.length})
        </button>
      </div>

      <div class="tab-content-container">
        <div class="tab-content active" id="description-tab">
          <div class="description-content">
            <h3>Mô tả sản phẩm ${product.name}</h3>
            <div class="description-text">
              ${
                product.fullDescription
                  ? product.fullDescription
                      .split("\n")
                      .map((p) => `<p>${p}</p>`)
                      .join("")
                  : `<p>${product.description}</p>`
              }
            </div>

            <div class="product-highlights">
              <h4>Điểm nổi bật:</h4>
              <ul class="highlights-list">
                <li><i class="fas fa-check-circle"></i> Thiết kế cao cấp, chất lượng premium</li>
                <li><i class="fas fa-check-circle"></i> Hiệu năng mạnh mẽ, xử lý mượt mà</li>
                <li><i class="fas fa-check-circle"></i> Bảo hành chính hãng toàn quốc</li>
                <li><i class="fas fa-check-circle"></i> Hỗ trợ kỹ thuật 24/7</li>
                <li><i class="fas fa-check-circle"></i> Giao hàng nhanh chóng, đóng gói cẩn thận</li>
              </ul>
            </div>

            ${
              product.tags && product.tags.length > 0
                ? `
              <div class="product-tags">
                <h4>Tags:</h4>
                <div class="tags-list">
                  ${product.tags.map((tag) => `<span class="product-tag">${tag}</span>`).join("")}
                </div>
              </div>
            `
                : ""
            }
          </div>
        </div>

        <div class="tab-content" id="specifications-tab">
          <div class="specifications-content">
            <h3>Thông số kỹ thuật ${product.name}</h3>
            <div class="specs-table">
              ${Object.entries(product.specifications || {})
                .map(
                  ([key, value]) => `
                  <div class="spec-row">
                    <div class="spec-label">${key}</div>
                    <div class="spec-value">${value}</div>
                  </div>
              `,
                )
                .join("")}
            </div>
          </div>
        </div>

        <div class="tab-content" id="reviews-tab">
          <div class="reviews-content">
            ${
              productReviews.length > 0
                ? `
                <div class="reviews-summary">
                  <div class="rating-overview">
                    <div class="overall-rating">
                      <span class="rating-number">${averageRating.toFixed(1)}</span>
                      <div class="rating-stars">${generateStars(averageRating)}</div>
                      <div class="rating-text">${productReviews.length} đánh giá</div>
                    </div>
                    <div class="rating-breakdown">
                      ${[5, 4, 3, 2, 1]
                        .map((star) => {
                          const count = productReviews.filter((r) => r.rating === star).length
                          const percentage = productReviews.length > 0 ? (count / productReviews.length) * 100 : 0
                          return `
                            <div class="rating-bar">
                              <span class="star-label">${star} sao</span>
                              <div class="rating-bar-fill">
                                <div class="rating-bar-progress" style="width: ${percentage}%"></div>
                              </div>
                              <span class="star-count">${count}</span>
                            </div>
                          `
                        })
                        .join("")}
                    </div>
                  </div>
                </div>

                <div class="reviews-list">
                  ${productReviews
                    .map(
                      (review) => `
                      <div class="review-item">
                        <div class="review-header">
                          <div class="reviewer-info">
                            <div class="reviewer-avatar">${review.userName.charAt(0).toUpperCase()}</div>
                            <div class="reviewer-details">
                              <div class="reviewer-name">${review.userName}</div>
                              <div class="review-date">${formatDate(review.date)}</div>
                            </div>
                          </div>
                          <div class="review-rating">${generateStars(review.rating)}</div>
                        </div>
                        <div class="review-content">${review.content}</div>
                        <div class="review-actions">
                          <button class="review-action" onclick="likeReview(${review.id})">
                            <i class="fas fa-thumbs-up"></i> Hữu ích (${review.helpful})
                          </button>
                          <button class="review-action" onclick="reportReview(${review.id})">
                            <i class="fas fa-flag"></i> Báo cáo
                          </button>
                        </div>
                      </div>
                  `,
                    )
                    .join("")}
                </div>
              `
                : `
                <div class="no-reviews">
                  <i class="fas fa-star"></i>
                  <h4>Chưa có đánh giá nào</h4>
                  <p>Hãy là người đầu tiên đánh giá sản phẩm này</p>
                </div>
              `
            }

            ${
              currentUser
                ? `
                <button class="add-review-btn" onclick="showAddReviewForm(${product.id})">
                  <i class="fas fa-plus"></i> Viết đánh giá
                </button>
              `
                : `
                <div class="login-to-review">
                  <p>Vui lòng <a href="#" onclick="showAuthModal('login')" class="login-link">đăng nhập</a> để đánh giá sản phẩm</p>
                </div>
              `
            }
          </div>
        </div>
      </div>
    </div>

    ${
      relatedProducts.length > 0
        ? `
      <div class="related-products-section">
        <h3 class="related-title">
          <i class="fas fa-layer-group"></i> Sản phẩm liên quan
        </h3>
        <div class="related-products-grid">
          ${relatedProducts
            .map(
              (relatedProduct) => `
            <div class="related-product-card" onclick="viewProductDetails(${relatedProduct.id})">
              <div class="related-product-image">
                <img src="${relatedProduct.image}" alt="${relatedProduct.name}">
                ${relatedProduct.badge ? `<span class="related-badge">${relatedProduct.badge}</span>` : ""}
              </div>
              <div class="related-product-info">
                <h4 class="related-product-name">${relatedProduct.name}</h4>
                <div class="related-product-rating">
                  ${generateStars(relatedProduct.rating || 0)}
                  <span>(${relatedProduct.reviewCount || 0})</span>
                </div>
                <div class="related-product-price">
                  <span class="related-current-price">${formatPrice(relatedProduct.price)}</span>
                  ${relatedProduct.originalPrice ? `<span class="related-original-price">${formatPrice(relatedProduct.originalPrice)}</span>` : ""}
                </div>
              </div>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
    `
        : ""
    }
  `

  productModal.style.display = "block"
  document.body.style.overflow = "hidden"
}

function quickView(productId) {
  viewProductDetails(productId)
}

function changeMainImage(imageSrc, thumbElement) {
  document.getElementById("main-product-image").src = imageSrc

  // Update active thumbnail
  document.querySelectorAll(".gallery-thumb").forEach((thumb) => {
    thumb.classList.remove("active")
  })
  thumbElement.classList.add("active")
}

function selectOption(button, optionType, value) {
  // Update active option button
  button.parentElement.querySelectorAll(`.${optionType}-option`).forEach((btn) => {
    btn.classList.remove("active")
  })
  button.classList.add("active")

  // Store selected option
  button.closest(".product-detail").setAttribute(`data-selected-${optionType}`, value)
}

function changeQuantity(change) {
  const quantityInput = document.getElementById("product-quantity")
  const currentQuantity = Number.parseInt(quantityInput.value)
  const maxQuantity = Number.parseInt(quantityInput.max)
  let newQuantity = currentQuantity + change

  if (newQuantity < 1) newQuantity = 1
  if (newQuantity > maxQuantity) newQuantity = maxQuantity

  quantityInput.value = newQuantity
}

function addToCartFromDetail(productId) {
  const quantity = Number.parseInt(document.getElementById("product-quantity").value)
  const selectedColor = document.querySelector(".product-detail")?.getAttribute("data-selected-color")
  const selectedStorage = document.querySelector(".product-detail")?.getAttribute("data-selected-storage")
  const selectedMemory = document.querySelector(".product-detail")?.getAttribute("data-selected-memory")
  const selectedConnectivity = document.querySelector(".product-detail")?.getAttribute("data-selected-connectivity")

  const product = products.find((p) => p.id === productId)
  if (!product) return

  const existingItem = cart.find(
    (item) =>
      item.id === productId &&
      item.selectedColor === selectedColor &&
      item.selectedStorage === selectedStorage &&
      item.selectedMemory === selectedMemory &&
      item.selectedConnectivity === selectedConnectivity,
  )

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.push({
      ...product,
      quantity: quantity,
      selectedColor: selectedColor || product.colors?.[0] || null,
      selectedStorage: selectedStorage || product.storage?.[0] || null,
      selectedMemory: selectedMemory || product.memory?.[0] || null,
      selectedConnectivity: selectedConnectivity || product.connectivity?.[0] || null,
    })
  }

  updateCartUI()
  saveCart()
  showNotification(`${product.name} đã được thêm vào giỏ hàng!`, "success")
}

function buyNow(productId) {
  addToCartFromDetail(productId)
  closeProductModal()
  proceedToCheckout()
}

function showDetailTab(tabName, event) {
  // Update active tab button
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  if (event && event.target) {
    event.target.classList.add("active")
  }

  // Show corresponding tab content
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.remove("active")
  })
  document.getElementById(`${tabName}-tab`).classList.add("active")
}

function closeProductModal() {
  productModal.style.display = "none"
  document.body.style.overflow = "auto"
}

// Authentication System
function showAuthModal(mode) {
  const loginForm = document.getElementById("login-form")
  const registerForm = document.getElementById("register-form")

  if (mode === "login") {
    loginForm.style.display = "block"
    registerForm.style.display = "none"
  } else {
    loginForm.style.display = "none"
    registerForm.style.display = "block"
  }

  authModal.style.display = "block"
  document.body.style.overflow = "hidden"
}

function closeAuthModal() {
  authModal.style.display = "none"
  document.body.style.overflow = "auto"
}

function handleLogin(event) {
  event.preventDefault()
  const formData = new FormData(event.target)
  const email = formData.get("email")
  const password = formData.get("password")

  // Simple validation (in real app, this would be server-side)
  const user = users.find((u) => u.email === email && u.password === password)

  if (user) {
    currentUser = user
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
    updateUserUI()
    closeAuthModal()
    showNotification(`Chào mừng ${user.fullName}!`, "success")
  } else {
    showNotification("Email hoặc mật khẩu không đúng", "error")
  }
}

function handleRegister(event) {
  event.preventDefault()
  const formData = new FormData(event.target)
  const fullName = formData.get("fullName")
  const email = formData.get("email")
  const phone = formData.get("phone")
  const password = formData.get("password")
  const confirmPassword = formData.get("confirmPassword")

  // Validation
  if (password !== confirmPassword) {
    showNotification("Mật khẩu xác nhận không khớp", "error")
    return
  }

  if (users.find((u) => u.email === email)) {
    showNotification("Email đã được sử dụng", "error")
    return
  }

  // Create new user
  const newUser = {
    id: Date.now(),
    fullName,
    email,
    phone,
    password,
    points: 100, // Welcome bonus
    joinDate: new Date().toISOString(),
    orders: [],
  }

  users.push(newUser)
  localStorage.setItem("users", JSON.stringify(users))

  currentUser = newUser
  localStorage.setItem("currentUser", JSON.stringify(currentUser))

  updateUserUI()
  closeAuthModal()
  showNotification(`Chào mừng ${fullName}! Bạn nhận được 100 điểm thưởng.`, "success")
}

function logout() {
  currentUser = null
  localStorage.removeItem("currentUser")
  updateUserUI()
  showNotification("Đã đăng xuất thành công", "info")
}

function updateUserUI() {
  if (currentUser) {
    userInfo.style.display = "block"
    authButtons.style.display = "none"
    userMenuItems.style.display = "block"

    userName.textContent = currentUser.fullName
    userEmail.textContent = currentUser.email
    userPoints.textContent = currentUser.points || 0

    // Update avatar
    userAvatar.innerHTML = `<span style="font-weight: 600;">${currentUser.fullName.charAt(0).toUpperCase()}</span>`
  } else {
    userInfo.style.display = "none"
    authButtons.style.display = "flex"
    userMenuItems.style.display = "none"

    userAvatar.innerHTML = '<i class="fas fa-user"></i>'
  }
}

function toggleUserMenu() {
  const isVisible = userDropdown.style.display === "block"
  userDropdown.style.display = isVisible ? "none" : "block"
}

function addUserPoints(points) {
  if (currentUser) {
    currentUser.points = (currentUser.points || 0) + points
    localStorage.setItem("currentUser", JSON.stringify(currentUser))

    // Update in users array
    const userIndex = users.findIndex((u) => u.id === currentUser.id)
    if (userIndex > -1) {
      users[userIndex] = currentUser
      localStorage.setItem("users", JSON.stringify(users))
    }

    updateUserUI()
  }
}

// Checkout Process
function proceedToCheckout() {
  if (cart.length === 0) {
    showNotification("Giỏ hàng của bạn đang trống!", "error")
    return
  }

  if (!currentUser) {
    showNotification("Vui lòng đăng nhập để tiếp tục", "warning")
    showAuthModal("login")
    return
  }

  toggleCart()
  showCheckoutModal()
}

function showCheckoutModal() {
  checkoutModal.style.display = "block"
  document.body.style.overflow = "hidden"
  showCheckoutStep(1)
}

function closeCheckoutModal() {
  checkoutModal.style.display = "none"
  document.body.style.overflow = "auto"
}

function showCheckoutStep(step) {
  // Update step indicators
  document.querySelectorAll(".step").forEach((stepEl, index) => {
    stepEl.classList.toggle("active", index + 1 <= step)
  })

  const checkoutForm = document.getElementById("checkout-form")

  switch (step) {
    case 1:
      checkoutForm.innerHTML = `
                <div class="form-section">
                    <h3>Thông tin giao hàng</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Họ và tên *</label>
                            <input type="text" name="fullName" value="${currentUser?.fullName || ""}" required>
                        </div>
                        <div class="form-group">
                            <label>Số điện thoại *</label>
                            <input type="tel" name="phone" value="${currentUser?.phone || ""}" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Email *</label>
                        <input type="email" name="email" value="${currentUser?.email || ""}" required>
                    </div>
                    <div class="form-group">
                        <label>Địa chỉ *</label>
                        <textarea name="address" rows="3" placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>Ghi chú đơn hàng</label>
                        <textarea name="notes" rows="2" placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."></textarea>
                    </div>
                </div>
                <div class="checkout-actions">
                    <button type="button" class="checkout-back" onclick="closeCheckoutModal()">Quay lại</button>
                    <button type="button" class="checkout-next" onclick="showCheckoutStep(2)">Tiếp tục</button>
                </div>
            `
      break

    case 2:
      checkoutForm.innerHTML = `
                <div class="form-section">
                    <h3>Phương thức giao hàng</h3>
                    <div class="payment-methods">
                        <div class="payment-method selected">
                            <input type="radio" name="shipping" value="standard" checked>
                            <div class="payment-icon"><i class="fas fa-truck"></i></div>
                            <div>
                                <strong>Giao hàng tiêu chuẩn</strong>
                                <p>2-3 ngày làm việc - Miễn phí</p>
                            </div>
                        </div>
                        <div class="payment-method">
                            <input type="radio" name="shipping" value="express">
                            <div class="payment-icon"><i class="fas fa-shipping-fast"></i></div>
                            <div>
                                <strong>Giao hàng nhanh</strong>
                                <p>1-2 ngày làm việc - 50,000đ</p>
                            </div>
                        </div>
                        <div class="payment-method">
                            <input type="radio" name="shipping" value="same-day">
                            <div class="payment-icon"><i class="fas fa-clock"></i></div>
                            <div>
                                <strong>Giao hàng trong ngày</strong>
                                <p>Trong vòng 4-6 giờ - 100,000đ</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="checkout-actions">
                    <button type="button" class="checkout-back" onclick="showCheckoutStep(1)">Quay lại</button>
                    <button type="button" class="checkout-next" onclick="showCheckoutStep(3)">Tiếp tục</button>
                </div>
            `
      break

    case 3:
      const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
      let discount = 0
      if (appliedCoupon) {
        discount =
          typeof appliedCoupon.discount === "number" && appliedCoupon.discount < 1
            ? subtotal * appliedCoupon.discount
            : appliedCoupon.discount
      }
      const shippingFee = 0 // Free shipping for now
      const total = subtotal - discount + shippingFee

      checkoutForm.innerHTML = `
                <div class="form-section">
                    <h3>Phương thức thanh toán</h3>
                    <div class="payment-methods">
                        <div class="payment-method selected">
                            <input type="radio" name="payment" value="cod" checked>
                            <div class="payment-icon"><i class="fas fa-money-bill-wave"></i></div>
                            <div>
                                <strong>Thanh toán khi nhận hàng (COD)</strong>
                                <p>Thanh toán bằng tiền mặt khi nhận hàng</p>
                            </div>
                        </div>
                        <div class="payment-method">
                            <input type="radio" name="payment" value="bank">
                            <div class="payment-icon"><i class="fas fa-university"></i></div>
                            <div>
                                <strong>Chuyển khoản ngân hàng</strong>
                                <p>Chuyển khoản qua ATM/Internet Banking</p>
                            </div>
                        </div>
                        <div class="payment-method">
                            <input type="radio" name="payment" value="momo">
                            <div class="payment-icon"><i class="fas fa-mobile-alt"></i></div>
                            <div>
                                <strong>Ví MoMo</strong>
                                <p>Thanh toán qua ví điện tử MoMo</p>
                            </div>
                        </div>
                        <div class="payment-method">
                            <input type="radio" name="payment" value="card">
                            <div class="payment-icon"><i class="fas fa-credit-card"></i></div>
                            <div>
                                <strong>Thẻ tín dụng/ghi nợ</strong>
                                <p>Visa, Mastercard, JCB</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-section">
                    <h3>Tóm tắt đơn hàng</h3>
                    <div style="background: var(--surface-color); padding: 1.5rem; border-radius: 8px;">
                        ${cart
                          .map(
                            (item) => `
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span>${item.name} x${item.quantity}</span>
                                <span>${formatPrice(item.price * item.quantity)}</span>
                            </div>
                        `,
                          )
                          .join("")}
                        <hr style="margin: 1rem 0; border: none; border-top: 1px solid var(--border-color);">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <span>Tạm tính:</span>
                            <span>${formatPrice(subtotal)}</span>
                        </div>
                        ${
                          discount > 0
                            ? `
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; color: var(--success-color);">
                                <span>Giảm giá:</span>
                                <span>-${formatPrice(discount)}</span>
                            </div>
                        `
                            : ""
                        }
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <span>Phí vận chuyển:</span>
                            <span>${shippingFee > 0 ? formatPrice(shippingFee) : "Miễn phí"}</span>
                        </div>
                        <hr style="margin: 1rem 0; border: none; border-top: 1px solid var(--border-color);">
                        <div style="display: flex; justify-content: space-between; font-size: 1.2rem; font-weight: 600;">
                            <span>Tổng cộng:</span>
                            <span style="color: var(--accent-color);">${formatPrice(total)}</span>
                        </div>
                    </div>
                </div>

                <div class="checkout-actions">
                    <button type="button" class="checkout-back" onclick="showCheckoutStep(2)">Quay lại</button>
                    <button type="button" class="checkout-next" onclick="completeOrder()">Đặt hàng</button>
                </div>
            `
      break
  }

  // Add event listeners for payment method selection
  document.querySelectorAll(".payment-method").forEach((method) => {
    method.addEventListener("click", function () {
      document.querySelectorAll(".payment-method").forEach((m) => m.classList.remove("selected"))
      this.classList.add("selected")
      this.querySelector('input[type="radio"]').checked = true
    })
  })
}

function completeOrder() {
  showLoading()

  // Simulate order processing
  setTimeout(() => {
    const orderId = "DH" + Date.now()
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    let discount = 0
    if (appliedCoupon) {
      discount =
        typeof appliedCoupon.discount === "number" && appliedCoupon.discount < 1
          ? subtotal * appliedCoupon.discount
          : appliedCoupon.discount
    }
    const total = subtotal - discount

    const order = {
      id: orderId,
      userId: currentUser.id,
      items: [...cart],
      subtotal,
      discount,
      total,
      status: "pending",
      date: new Date().toISOString(),
      appliedCoupon: appliedCoupon ? appliedCoupon.description : null,
    }

    orders.push(order)
    localStorage.setItem("orders", JSON.stringify(orders))

    // Add points for purchase
    addUserPoints(Math.floor(total / 100000))

    // Clear cart
    cart = []
    appliedCoupon = null
    updateCartUI()
    saveCart()

    hideLoading()
    closeCheckoutModal()

    showNotification("Đặt hàng thành công!", "success", `Mã đơn hàng: ${orderId}`)

    // Show order confirmation
    setTimeout(() => {
      alert(`Cảm ơn bạn đã đặt hàng!

Mã đơn hàng: ${orderId}
Tổng tiền: ${formatPrice(total)}

Chúng tôi sẽ liên hệ với bạn sớm nhất để xác nhận đơn hàng.`)
    }, 1000)
  }, 2000)
}

// Chat Support
function toggleChat() {
  const isVisible = chatWindow.style.display === "block"
  chatWindow.style.display = isVisible ? "none" : "block"

  if (!isVisible) {
    // Auto-scroll to bottom
    setTimeout(() => {
      chatMessages.scrollTop = chatMessages.scrollHeight
    }, 100)
  }
}

function sendMessage() {
  const message = chatInputField.value.trim()
  if (!message) return

  // Add user message
  addChatMessage(message, "user")
  chatInputField.value = ""

  // Simulate bot response
  setTimeout(() => {
    const botResponse = getBotResponse(message)
    addChatMessage(botResponse, "bot")
  }, 1000)
}

function addChatMessage(message, sender) {
  const messageDiv = document.createElement("div")
  messageDiv.className = `message ${sender}-message`
  messageDiv.innerHTML = `<p>${message}</p>`

  chatMessages.appendChild(messageDiv)
  chatMessages.scrollTop = chatMessages.scrollHeight
}

function getBotResponse(userMessage) {
  const message = userMessage.toLowerCase()

  if (message.includes("giá") || message.includes("bao nhiêu")) {
    return "Bạn có thể xem giá sản phẩm trực tiếp trên trang web. Chúng tôi có nhiều chương trình khuyến mãi hấp dẫn!"
  } else if (message.includes("giao hàng") || message.includes("ship")) {
    return "Chúng tôi có 3 hình thức giao hàng: Tiêu chuẩn (2-3 ngày), Nhanh (1-2 ngày), và Trong ngày (4-6 giờ). Miễn phí giao hàng cho đơn từ 500k!"
  } else if (message.includes("bảo hành")) {
    return "Tất cả sản phẩm đều có bảo hành chính hãng. Thời gian bảo hành tùy theo từng sản phẩm, thường từ 12-24 tháng."
  } else if (message.includes("thanh toán")) {
    return "Chúng tôi hỗ trợ nhiều hình thức thanh toán: COD, chuyển khoản, ví MoMo, và thẻ tín dụng."
  } else if (message.includes("xin chào") || message.includes("hello")) {
    return "Xin chào! Tôi là trợ lý ảo của TechStore. Tôi có thể giúp bạn tìm hiểu về sản phẩm, giá cả, và chính sách của chúng tôi. Bạn cần hỗ trợ gì?"
  } else {
    return "Cảm ơn bạn đã liên hệ! Để được hỗ trợ tốt nhất, vui lòng gọi hotline 0123 456 789 hoặc email info@techstore.com. Chúng tôi sẽ phản hồi trong 24h!"
  }
}

// Countdown Timer for Flash Sale
function startCountdown() {
  const countdownDate = new Date().getTime() + 24 * 60 * 60 * 1000 // 24 hours from now

  const timer = setInterval(() => {
    const now = new Date().getTime()
    const distance = countdownDate - now

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    document.getElementById("hours").textContent = hours.toString().padStart(2, "0")
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0")
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0")

    if (distance < 0) {
      clearInterval(timer)
      document.getElementById("countdown").innerHTML =
        '<div style="color: var(--accent-color); font-weight: 600;">Flash Sale đã kết thúc!</div>'
    }
  }, 1000)
}

// Utility Functions
function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price)
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function showNotification(message, type = "success", title = "") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`

  const iconMap = {
    success: "fas fa-check-circle",
    error: "fas fa-exclamation-circle",
    warning: "fas fa-exclamation-triangle",
    info: "fas fa-info-circle",
  }

  notification.innerHTML = `
        <div class="notification-icon">
            <i class="${iconMap[type]}"></i>
        </div>
        <div class="notification-content">
            ${title ? `<div class="notification-title">${title}</div>` : ""}
            <div class="notification-message">${message}</div>
        </div>
        <div class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </div>
    `

  document.getElementById("notifications").appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = "slideOutRight 0.3s ease"
      setTimeout(() => {
        notification.remove()
      }, 300)
    }
  }, 5000)
}

function showLoading() {
  loading.style.display = "flex"
}

function hideLoading() {
  loading.style.display = "none"
}

function scrollToProducts() {
  document.getElementById("products").scrollIntoView({
    behavior: "smooth",
  })
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Contact Form Handler
function handleContactForm(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const name = formData.get("name")
  const email = formData.get("email")
  const phone = formData.get("phone")
  const message = formData.get("message")

  showLoading()

  // Simulate form submission
  setTimeout(() => {
    hideLoading()
    showNotification("Cảm ơn bạn đã liên hệ!", "success", "Chúng tôi sẽ phản hồi sớm nhất có thể.")
    e.target.reset()
  }, 1500)
}

// Additional Features
function showProfile() {
  showUserAccountModal()
  showUserAccountTab('profile')
  loadUserProfile()
}

function showOrderHistory() {
  showUserAccountModal()
  showUserAccountTab('orders')
  loadUserOrderHistory()
}

function showSettings() {
  showUserAccountModal()
  showUserAccountTab('settings')
  loadUserSettings()
}

// Show user account modal
function showUserAccountModal() {
  const modal = document.getElementById('user-account-modal')
  if (modal) {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
  }
}

// Close user account modal
function closeUserAccountModal() {
  const modal = document.getElementById('user-account-modal')
  if (modal) {
    modal.style.display = 'none'
    document.body.style.overflow = 'auto'
  }
}

// Switch tabs inside user account modal
function showUserAccountTab(tabName) {
  const tabs = ['profile', 'orders', 'settings']
  tabs.forEach((tab) => {
    const btn = document.getElementById(`tab-${tab}-btn`)
    const content = document.getElementById(`user-${tab}-tab`)
    if (btn && content) {
      if (tab === tabName) {
        btn.classList.add('active')
        content.classList.add('active')
      } else {
        btn.classList.remove('active')
        content.classList.remove('active')
      }
    }
  })
}

// Load user profile content
function loadUserProfile() {
  const profileTab = document.getElementById('user-profile-tab')
  if (!profileTab) return

  if (!currentUser) {
    profileTab.innerHTML = '<p>Vui lòng đăng nhập để xem hồ sơ.</p>'
    return
  }

  profileTab.innerHTML = `
    <form id="profile-form" class="profile-info">
      <label for="fullName">Họ và tên</label>
      <input type="text" id="fullName" name="fullName" value="${currentUser.fullName || ''}" required>

      <label for="email">Email</label>
      <input type="email" id="email" name="email" value="${currentUser.email || ''}" required disabled>

      <label for="phone">Số điện thoại</label>
      <input type="tel" id="phone" name="phone" value="${currentUser.phone || ''}" required>

      <label for="address">Địa chỉ</label>
      <textarea id="address" name="address" placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"></textarea>

      <div class="profile-buttons">
        <button type="submit" class="save-btn">Lưu</button>
        <button type="button" class="cancel-btn" onclick="showProfile()">Hủy</button>
      </div>
    </form>
  `

  const profileForm = document.getElementById('profile-form')
  profileForm.addEventListener('submit', (e) => {
    e.preventDefault()
    saveUserProfile()
  })
}

// Save user profile changes
function saveUserProfile() {
  const fullNameInput = document.getElementById('fullName')
  const phoneInput = document.getElementById('phone')
  const addressInput = document.getElementById('address')

  if (!fullNameInput || !phoneInput || !addressInput) return

  currentUser.fullName = fullNameInput.value.trim()
  currentUser.phone = phoneInput.value.trim()
  currentUser.address = addressInput.value.trim()

  // Update localStorage and UI
  localStorage.setItem('currentUser', JSON.stringify(currentUser))
  const userIndex = users.findIndex((u) => u.id === currentUser.id)
  if (userIndex > -1) {
    users[userIndex] = currentUser
    localStorage.setItem('users', JSON.stringify(users))
  }

  updateUserUI()
  showNotification('Cập nhật hồ sơ thành công!', 'success')
}

// Load user order history content
function loadUserOrderHistory() {
  const ordersTab = document.getElementById('user-orders-tab')
  if (!ordersTab) return

  if (!currentUser) {
    ordersTab.innerHTML = '<p>Vui lòng đăng nhập để xem lịch sử đơn hàng.</p>'
    return
  }

  const userOrders = orders.filter((order) => order.userId === currentUser.id)

  if (userOrders.length === 0) {
    ordersTab.innerHTML = '<p>Bạn chưa có đơn hàng nào.</p>'
    return
  }

  // Helper function to get status label and color
  function getStatusInfo(status) {
    switch (status) {
      case 'pending':
        return { label: 'Đang xử lý', color: 'var(--warning-color)' }
      case 'shipped':
        return { label: 'Đang giao hàng', color: 'var(--primary-color)' }
      case 'delivered':
        return { label: 'Đã giao hàng', color: 'var(--success-color)' }
      case 'cancelled':
        return { label: 'Đã hủy', color: 'var(--accent-color)' }
      default:
        return { label: status, color: 'var(--text-secondary)' }
    }
  }

  let html = '<ul class="order-history-list">'
  userOrders.forEach((order) => {
    const statusInfo = getStatusInfo(order.status)
    html += `
      <li>
        <div class="order-id">Mã đơn hàng: ${order.id}</div>
        <div class="order-date">Ngày: ${formatDate(order.date)}</div>
        <div class="order-total">Tổng tiền: ${formatPrice(order.total)}</div>
        <div class="order-status" style="color: ${statusInfo.color}; font-weight: 600;">
          Trạng thái: ${statusInfo.label}
        </div>
        <div class="order-actions">
          ${
            order.status !== 'cancelled' && order.status !== 'delivered'
              ? `<button class="cancel-order-btn" onclick="cancelOrder('${order.id}')">Hủy đơn hàng</button>`
              : ''
          }
          <button class="track-order-btn" onclick="viewOrderTracking('${order.id}')">Xem tiến trình</button>
        </div>
      </li>
    `
  })
  html += '</ul>'

  ordersTab.innerHTML = html
}

// Cancel order function
function cancelOrder(orderId) {
  if (!confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) return

  const orderIndex = orders.findIndex((order) => order.id === orderId && order.userId === currentUser.id)
  if (orderIndex === -1) {
    showNotification('Không tìm thấy đơn hàng để hủy.', 'error')
    return
  }

  if (orders[orderIndex].status === 'delivered' || orders[orderIndex].status === 'cancelled') {
    showNotification('Đơn hàng không thể hủy.', 'warning')
    return
  }

  orders[orderIndex].status = 'cancelled'
  localStorage.setItem('orders', JSON.stringify(orders))
  showNotification('Đơn hàng đã được hủy thành công.', 'success')
  loadUserOrderHistory()
}

// View order tracking function
function viewOrderTracking(orderId) {
  const order = orders.find((order) => order.id === orderId && order.userId === currentUser.id)
  if (!order) {
    showNotification('Không tìm thấy đơn hàng.', 'error')
    return
  }

  // Simple tracking steps based on status
  const steps = [
    { key: 'pending', label: 'Đang xử lý' },
    { key: 'shipped', label: 'Đang giao hàng' },
    { key: 'delivered', label: 'Đã giao hàng' },
  ]

  let currentStepIndex = steps.findIndex((step) => step.key === order.status)
  if (currentStepIndex === -1) currentStepIndex = 0

  // Simulated delivery tracking data
  const deliveryInfo = {
    departure: "Kho trung tâm TP.HCM",
    currentLocation: "Quận 3, TP.HCM",
    destination: "Quận 1, TP.HCM",
    deliveryPerson: {
      name: "Nguyễn Văn Tài",
      phone: "0123 456 789",
      vehicle: "Xe máy số 123-45",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    route: [
      "Kho trung tâm TP.HCM",
      "Quận 3, TP.HCM",
      "Quận 1, TP.HCM"
    ]
  }

  let trackingHtml = `
    <div class="order-tracking-modal">
      <h3>Tiến trình đơn hàng: ${order.id}</h3>
      <div class="delivery-map-placeholder">
        <p>Bản đồ theo dõi giao hàng (chưa tích hợp bản đồ thực tế)</p>
      </div>
      <ul class="tracking-steps">
  `

  steps.forEach((step, index) => {
    const isActive = index <= currentStepIndex
    trackingHtml += `
      <li class="tracking-step ${isActive ? 'active' : ''}">
        <span class="step-label">${step.label}</span>
        ${isActive ? '<i class="fas fa-check-circle"></i>' : '<i class="far fa-circle"></i>'}
      </li>
    `
  })

  trackingHtml += `
      </ul>
      <div class="delivery-info">
        <h4>Thông tin người giao hàng</h4>
        <div class="delivery-person">
          <img src="${deliveryInfo.deliveryPerson.avatar}" alt="Avatar người giao hàng" class="delivery-avatar">
          <div class="delivery-details">
            <p><strong>Tên:</strong> ${deliveryInfo.deliveryPerson.name}</p>
            <p><strong>Điện thoại:</strong> ${deliveryInfo.deliveryPerson.phone}</p>
            <p><strong>Phương tiện:</strong> ${deliveryInfo.deliveryPerson.vehicle}</p>
          </div>
        </div>
        <h4>Hành trình giao hàng</h4>
        <ol class="delivery-route">
          ${deliveryInfo.route.map((location) => `<li>${location}</li>`).join('')}
        </ol>
        <p><strong>Vị trí hiện tại:</strong> ${deliveryInfo.currentLocation}</p>
      </div>
      <button onclick="closeOrderTrackingModal()">Đóng</button>
    </div>
  `

  // Create modal container if not exists
  let modal = document.getElementById('order-tracking-modal')
  if (!modal) {
    modal = document.createElement('div')
    modal.id = 'order-tracking-modal'
    modal.className = 'modal'
    document.body.appendChild(modal)
  }

  modal.innerHTML = `
    <div class="modal-content order-tracking-modal-content">
      <span class="close-modal" onclick="closeOrderTrackingModal()">&times;</span>
      ${trackingHtml}
    </div>
  `
  modal.style.display = 'block'
  document.body.style.overflow = 'hidden'
}

function closeOrderTrackingModal() {
  const modal = document.getElementById('order-tracking-modal')
  if (modal) {
    modal.style.display = 'none'
    document.body.style.overflow = 'auto'
  }
}

// Load user settings content
function loadUserSettings() {
  const settingsTab = document.getElementById('user-settings-tab')
  if (!settingsTab) return

  if (!currentUser) {
    settingsTab.innerHTML = '<p>Vui lòng đăng nhập để xem cài đặt.</p>'
    return
  }

  // Example settings - can be expanded
  settingsTab.innerHTML = `
    <div class="settings-content">
      <div class="settings-item">
        <label for="emailNotifications">Nhận thông báo qua email</label>
        <input type="checkbox" id="emailNotifications" ${currentUser.emailNotifications ? 'checked' : ''}>
      </div>
      <div class="settings-item">
        <label for="smsNotifications">Nhận thông báo qua SMS</label>
        <input type="checkbox" id="smsNotifications" ${currentUser.smsNotifications ? 'checked' : ''}>
      </div>
      <div class="settings-item">
        <label for="darkModeSetting">Chế độ tối</label>
        <input type="checkbox" id="darkModeSetting" ${currentTheme === 'dark' ? 'checked' : ''}>
      </div>
      <div class="profile-buttons">
        <button type="button" class="save-btn" onclick="saveUserSettings()">Lưu cài đặt</button>
      </div>
    </div>
  `

  // Add event listeners for checkboxes if needed
}

// Save user settings changes
function saveUserSettings() {
  const emailNotifications = document.getElementById('emailNotifications')?.checked || false
  const smsNotifications = document.getElementById('smsNotifications')?.checked || false
  const darkModeSetting = document.getElementById('darkModeSetting')?.checked || false

  if (!currentUser) return

  currentUser.emailNotifications = emailNotifications
  currentUser.smsNotifications = smsNotifications
  localStorage.setItem('currentUser', JSON.stringify(currentUser))

  // Save settings in localStorage or apply immediately
  if (darkModeSetting) {
    applyTheme('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    applyTheme('light')
    localStorage.setItem('theme', 'light')
  }

  showNotification('Cài đặt đã được lưu!', 'success')
}

function showForgotPassword() {
  const email = prompt("Nhập email của bạn để khôi phục mật khẩu:")
  if (email) {
    showNotification("Link khôi phục mật khẩu đã được gửi đến email của bạn!", "info")
  }
}

function likeReview(reviewId) {
  showNotification("Cảm ơn bạn đã đánh giá hữu ích!", "success")
}

function reportReview(reviewId) {
  showNotification("Đã báo cáo đánh giá. Chúng tôi sẽ xem xét.", "info")
}

function showAddReviewForm(productId) {
  const rating = prompt("Đánh giá sản phẩm (1-5 sao):")
  const comment = prompt("Nhận xét của bạn:")

  if (rating && comment) {
    showNotification("Cảm ơn bạn đã đánh giá sản phẩm!", "success")
    // In real app, this would save to database
  }
}

// Performance optimization: Lazy loading for images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img)
  })
}

// Service Worker for offline functionality (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}

// Add CSS animations for notifications
const style = document.createElement("style")
style.textContent = `
@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(100%);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideOutRight {
    from {
        opacity: 1;
        transform: translateX(0);
    }
    to {
        opacity: 0;
        transform: translateX(100%);
    }
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
}

.notification {
    animation: slideInRight 0.3s ease;
}

.cart-icon:hover,
.wishlist-icon:hover {
    animation: pulse 0.3s ease;
}
`
document.head.appendChild(style)
