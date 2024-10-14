
const specsData = [
    {
        specName: "Form Factor",
        specValue: "ATX Tower",
        desc: "Full Size Upright Symmetrical Design"
    },
    {
        specName: "CPU Cooling",
        specValue: "250W TDP",
        desc: "With support for all current Desktop Sockets"
    },
    {
        specName: "Motherboard",
        specValue: "ATX+",
        desc: "or Mini-ITX, or Micro-ATX, or E-ATX support depending on motherboard depth"
    },
    {
        specName: "GPU Cooling",
        specValue: "350W TDP",
        desc: "With support for a growing range of cards (see updated list)"
    },
    {
        specName: "PSU Compatability",
        specValue: "ATX+",
        desc: "Up to 300mm Long, SFX also supported"
    },
    {
        specName: "Cooling Technology",
        specValue: "Proprietary LHP",
        desc: "Two independent loop heat pipe systems (for CPU and GPU)"
    },
    {
        specName: "Drive Support",
        specValue: '2.5" + 3.5"',
        desc: 'Multiple drives with a minimum of 3 x 3.5" or 5 x 2.5"'
    },
    {
        specName: "Refrigerant",
        specValue: "R1233ZD(E)",
        desc: "Non Conductive Dielectric"
    },
    {
        specName: "Fan Support",
        specValue: "120 - 200mm",
        desc: "Multiple 120mm fans natively, larger fans via brackets/diagonal mounting"
    },
    {
        specName: "Silver SKU",
        specValue: "ST-SG10S",
        desc: "Standard AL Condenser, EAN: 8718469091973"
    },
    {
        specName: "Size",
        specValue: "84.3ℓ",
        desc: "605 x 520 x 268mm, L x H x W"
    },
    {
        specName: "Black SKU",
        specValue: "ST-SG10B",
        desc: "Standard AL Condenser, EAN: 8718469091966"
    },
    {
        specName: "Front IO",
        specValue: "1 x C, 2 x A",
        desc: "C: Type-E, A: 19PIN, Additional Modules Optional"
    },
    {
        specName: "Copper SKU",
        specValue: "ST-SG10CE",
        desc: "Copper Condenser, 500pcs Limited Production , EAN: 8718469092086"
    }
]
const featuresData = [
    {
        tags: [
            { x: "0px", y: "0px", name: "فن های خنک کننده" },
            { x: "0px", y: "0px", name: "حلقه کندانسور" },
            { x: "0px", y: "0px", name: "لاینهای انعطاف پذیر" },
        ],
        src: "sg10-f1-1536x864.webp",
        description: "در قلب SG10 و چیزی که این عملکرد خنک کننده را ممکن می کند، سیستم Loop Heat Pipe (LHP) داخل آن است. برخلاف لوله های حرارتی سنتی، که در آن تغییر فاز سیال عامل در جهت های مخالف در داخل لوله اتفاق می افتد، چرخه تغییر فاز LHP در یک جریان پیوسته در اطراف حلقه اتفاق می افتد. فناوری هسته ای که این امکان را فراهم می کند اواپراتور است، دارای یک پمپ مویرگی حالت جامد (بدون قطعات متحرک) است که یک جریان بخار تحت فشار را به داخل کندانسور ایجاد می کند، جایی که دوباره به مایع خنک می شود و سپس به اواپراتور جریان می یابد، جایی که چرخه تکرار می شود.",
        title: "لوله حرارتی حلقه ای"
    }, {
        tags: [
            { x: "0px", y: "0px", name: "فن های خنک کننده" },
            { x: "0px", y: "0px", name: "حلقه کندانسور" },
            { x: "0px", y: "0px", name: "لاینهای انعطاف پذیر" },
        ],
        src: "sg10-f2-1536x864.webp",
        description: "SG10 با قابلیت تنظیم کامل موقعیت X & Y مادربرد و پردازنده گرافیکی با آزادی کامل، انعطاف پذیری را به سطح بعدی ارتقا می دهد. این سطح از تنظیم همراه با لوله های LHP انعطاف پذیر به این معنی است که سازگاری بسیار فراتر از آن چیزی است که با خنک کننده لوله حرارتی قبلی امکان پذیر است. یک مثال عالی از این انعطاف‌پذیری، توانایی نصب دو مادربرد Mini-ITX (و دو PSU) در صورت عدم نیاز به یک GPU محتاط، ایجاد یک رایانه بدون فن با سیستم دوگانه است.",
        title: "براکت های مدولار X-FRAME"
    }, {
        tags: [
            { x: "0px", y: "0px", name: "فن های خنک کننده" },
            { x: "0px", y: "0px", name: "حلقه کندانسور" },
            { x: "0px", y: "0px", name: "لاینهای انعطاف پذیر" },
        ],
        src: "sg10-f3-1536x864.webp",
        description: "ز آنجایی که LHP و کل محلول خنک‌کننده قطعات جدایی‌ناپذیر کیس هستند، ایجاد یک راه‌حل نصب همه‌کاره که در صورت تغییر مجدد مشخصات سوکت، در آینده به راحتی قابل تطبیق باشد، ضروری است. راه حل ارائه شده بسیار ماژولار است و امکان تطبیق سریع با مکان های سوراخ جدید و الزامات ارتفاع z را فراهم می کند.",
        title: "نصب CPU همه کاره"
    }, {
        tags: [
            { x: "0px", y: "0px", name: "فن های خنک کننده" },
            { x: "0px", y: "0px", name: "حلقه کندانسور" },
            { x: "0px", y: "0px", name: "لاینهای انعطاف پذیر" },
        ],
        src: "sg10-f4-1536x864.webp",
        description: "یکی از بزرگترین چالش های این محصول، سازگاری با پردازنده گرافیکی بوده است. برای غلبه بر مسئله طرح‌بندی‌های بسیار متفاوت و قرار دادن اجزا، ما یک رویکرد ماژولار با تجهیزات خنک‌کننده GPU DIE، VRAM و VRM مستقل اتخاذ کرده‌ایم. VRM از سینک های حرارتی مستقل استفاده می کند و VRAM با DIE از طریق صفحات سرد سفارشی خنک می شود.",
        title: "خنک کننده پردازنده گرافیکی مدولار"
    }, {
        tags: [
            { x: "0px", y: "0px", name: "فن های خنک کننده" },
            { x: "0px", y: "0px", name: "حلقه کندانسور" },
            { x: "0px", y: "0px", name: "لاینهای انعطاف پذیر" },
        ],
        src: "sg10-f5-1536x864.webp",
        description: "عملکرد 600 وات خنک کننده بدون فن پیشگامانه قابل توجه است، اما اگر قطعات پیشرفته نیاز بیشتری داشته باشند چه؟ به جای ایجاد یک سناریوی همه یا هیچ، SG10 می تواند فن ها را در خود جای دهد و عملکرد خنک کننده را 15020 درصد افزایش دهد و در عین حال امکان عملکرد تقریباً بی صدا را فراهم کند. فن های 120 میلی متری بوسیله ریل ها پشتیبانی می شوند و فن های بزرگتر را می توان با براکت ها استفاده کرد.",
        title: "فراتر از 600 وات"
    }, {
        tags: [
            { x: "0px", y: "0px", name: "فن های خنک کننده" },
            { x: "0px", y: "0px", name: "حلقه کندانسور" },
            { x: "0px", y: "0px", name: "لاینهای انعطاف پذیر" },
        ],
        src: "sg10-f6-1536x864.webp",
        description: "مکان دکمه پاور / درگاه های جلو را دوست ندارید؟ مشکلی نیست! می توان آن را تقریباً در هر جایی در جلو (یا پشت) قاب قرار داد زیرا می توان آن را در هر نقطه در امتداد تخته ها و بین هر دو محکم کرد. ماژول‌های IO اضافی نیز برای افزودن گزینه‌هایی برای پورت‌های بیشتر بر اساس بازخورد مشتری در دسترس خواهند بود.",
        title: "ماژول های IO متحرک و قابل گسترش"
    }, {
        tags: [
            { x: "0px", y: "0px", name: "فن های خنک کننده" },
            { x: "0px", y: "0px", name: "حلقه کندانسور" },
            { x: "0px", y: "0px", name: "لاینهای انعطاف پذیر" },
        ],
        src: "sg10-f7-1536x864.webp",
        description: "براکت های یونیورسال بازگشته اند و یک بار دیگر کنترل باورنکردنی را بر روی مکان یابی اجزای کمکی می دهند. ساخت بدون فن بدون یک PSU بدون فن منطبق کامل نخواهد بود، که احتمالاً بزرگتر و سنگین تر از نمونه های مشابه با خنک کننده فعال است. خوشبختانه، SG10 فضای زیادی برای یک PSU بسیار بزرگ دارد و با معماری باز و توانایی تنظیم کامل مکان و فاصله، این مشکلی ایجاد نخواهد کرد. برای کسانی که هنوز درایوهای مکانیکی یا SSDهای با فرمت 2.5 اینچی را می‌خواهند، براکت‌های جهانی به آن‌ها اجازه می‌دهند که در چندین مکان در امتداد ریل نصب شوند.",
        title: "براکت های جهانی برای حداکثر انعطاف پذیری"
    }
]
let overviewCard_wrapper = document.createElement("div")
overviewCard_wrapper.classList.add("overviewCard_wrapper")
specsData.forEach(({ desc, specName, specValue }) => {
    overviewCard_wrapper.innerHTML += `
        <div class="overviewCard">
            <div class="overviewCard_header">
                <span>
                    ${specName}
                </span>
                <span class="overviewCard_dashed"></span>
                <span>
                    ${specValue}
                </span>
            </div>
            ${desc}
        </div>
    `
})

// const features=document.querySelector(".features").innerHTML=`
// `

// // document.querySelector("div").addEventListener("dragover")
// // document.querySelector(".swipper").addEventListener("drag", (event) => {
// //     console.log(event.clientX);
// // })
// // document.querySelector("div").addEventListener("click", function (event) {
// //     console.log(event)
// // })
// let leastPageX = 0
// let mouseMove = "left"
// let dragstart = 0
// let pagination = 0
// document.querySelector(".swipper").addEventListener("dragend", ({ pageX }) => {
//     dragstart = pageX
// })
// document.querySelector(".swipper").addEventListener("dragstart", ({ pageX }) => {
//     dragstart = pageX
//     leastPageX = pageX
// })
// const width = document.querySelector(".swipper").clientWidth
// document.querySelector(".swipper").addEventListener("dragover", async ({ pageX }) => {
//     if (pageX - leastPageX > 0) {
//         mouseMove = "right"
//     }
//     if (pageX - leastPageX === 0) {
//         mouseMove = "none"
//     }
//     if (pageX - leastPageX < 0) {
//         // console.log(pageX - dragstart);
//         mouseMove = "left"
//     }
//     console.log(((pageX - dragstart) / width) * 100);
//     // console.log({ dragstart, mouseMove, leastPageX, pageX });
//     // console.log(pageX - leastPageX);
//     leastPageX = await pageX
// })



// $(document).ready(function () {
//     $(".swipper").vc3dEye({
//         imagePath: "images/",// the location where you’ve put the images.
//         totalImages: 24,// the number of images you have.
//         imageExtension: "webp" // the extension of the images. Make sure all the images have same extension.
//     });
// });



// $(function () {
//     var frames = [
//         "images/sg10-360_01.webp",
//         "images/sg10-360_02.webp",
//         "images/sg10-360_03.webp",
//         "images/sg10-360_04.webp",
//         "images/sg10-360_05.webp",
//         "images/sg10-360_06.webp",
//         "images/sg10-360_07.webp",
//         "images/sg10-360_08.webp",
//         "images/sg10-360_09.webp",
//         "images/sg10-360_10.webp",
//         "images/sg10-360_11.webp",
//         "images/sg10-360_12.webp",
//         "images/sg10-360_13.webp",
//         "images/sg10-360_14.webp",
//         "images/sg10-360_15.webp",
//         "images/sg10-360_16.webp",
//         "images/sg10-360_17.webp",
//         "images/sg10-360_18.webp",
//         "images/sg10-360_19.webp",
//         "images/sg10-360_20.webp",
//         "images/sg10-360_21.webp",
//         "images/sg10-360_22.webp",
//         "images/sg10-360_23.webp",
//         "images/sg10-360_24.webp"
//     ];
//     $(".swipper").spritespin({
//         width: 653,
//         height: 489,
//         frames: frames.length,
//         behavior: "drag", // "hold"
//         module: "360",
//         sense: -1,
//         source: frames,
//         animate: true,
//         loop: true,
//         frameWrap: true,
//         frameStep: 1,
//         frameTime: 60,
//         enableCanvas: true
//     });
// });

// console.log(SpriteSpin);
SpriteSpin.create({
    target: '.swipper',
    source: SpriteSpin.source('images/sg10-360_{frame}.webp', {
        frame: [1, 24],
        digits: 2
    })
    , animate: false,
    // , retainAnimate: true
    // , responsive: true
    // , plugins: ["360", "progress", "drag", "smooth"]
})


document.querySelector("header").querySelectorAll(".flashes").forEach((flash) => {
    const headerMenu_li = flash.parentElement.parentElement
    const headerMenu_underlist = headerMenu_li.querySelector(".headerMenu_underlist")
    // mouse position related to headerMenu_li
    let state1 = false
    // mouse position related to headerMenu_underlist
    let state2 = false
    // mouse position related to layer2Underlist if exists
    let state3 = false
    headerMenu_li.addEventListener("mouseenter", () => {
        state1 = true
        headerMenu_underlist.classList.remove("dispNone")
        setTimeout(() => {
            headerMenu_underlist.classList.remove("hidden")
        }, 1);
    })
    headerMenu_li.addEventListener("mouseleave", () => {
        console.log("vvvvv");
        if (state1) {
            setTimeout(() => {
                // console.log({ state1, state2 });
                headerMenu_underlist.classList.add("dispNone")
            }, 10);
            headerMenu_underlist.classList.add("hidden")
        }
    })
    headerMenu_underlist.addEventListener("mouseenter", () => {
        console.log("aaa");
        state2 = true
    })
    // headerMenu_underlist.addEventListener("mouseleave", () => {
    //     state2 = false
    //     if (!(state1)) {
    //         setTimeout(() => {
    //             headerMenu_underlist.classList.add("dispNone")
    //         }, 10);
    //         headerMenu_underlist.classList.add("hidden")
    //     }
    // })
    ////
    if (headerMenu_underlist.getAttribute("aria-label") === "hasSubList") {
        headerMenu_underlist.querySelectorAll(".underlist_li").forEach(underlist_li => {
            underlist_li.addEventListener("mouseenter", () => {
                console.log("aaaaa");
                state3 = true
                underlist_li.querySelector(".layer2Underlist").classList.remove("dispNone")
                setTimeout(() => {
                    underlist_li.querySelector(".layer2Underlist").classList.remove("hidden")
                }, 1);
            })
            underlist_li.addEventListener("mouseleave", () => {
                // console.log({ state1, state2, state3 });
                if ((state2)) {
                    setTimeout(() => {
                        // console.log({ state1, state2 });
                        underlist_li.querySelector(".layer2Underlist").classList.add("dispNone")
                    }, 10);
                    underlist_li.querySelector(".layer2Underlist").classList.add("hidden")
                }
            })
            underlist_li.querySelector(".layer2Underlist").addEventListener("mouseenter", () => {
                state3 = true
            })
            underlist_li.querySelector(".layer2Underlist").addEventListener("mouseleave", () => {
                // state3 = false
                // if (!(state2)) {
                //     setTimeout(() => {
                //         headerMenu_underlist.querySelector(".layer2Underlist_li").classList.add("dispNone")
                //     }, 10);
                //     setTimeout(() => {
                //         headerMenu_underlist.querySelector(".layer2Underlist_li").classList.add("hidden")
                //     }, 0);
                // }
            })
        })
    }
})






// document.querySelector("header").querySelectorAll(".flashes").forEach((flash) => {
//     const headerMenu_li = flash.parentElement.parentElement
//     const headerMenu_underlist = headerMenu_li.querySelector(".headerMenu_underlist")
//     // mouse position related to headerMenu_li
//     let state1 = false
//     // mouse position related to headerMenu_underlist
//     let state2 = false
//     headerMenu_li.addEventListener("mouseenter", () => {
//         state1 = true
//         headerMenu_underlist.classList.remove("dispNone")
//         setTimeout(() => {
//             headerMenu_underlist.classList.remove("hidden")
//         }, 1);
//     })
//     headerMenu_li.addEventListener("mouseleave", () => {
//         setTimeout(() => {
//             if (!state2) {
//                 setTimeout(() => {
//                     headerMenu_underlist.classList.add("dispNone")
//                 }, 10);
//                 headerMenu_underlist.classList.add("hidden")
//             }
//         }, 300);
//     })
//     headerMenu_underlist.addEventListener("mouseleave", () => {
//         state2 = false
//     })
//     headerMenu_underlist.addEventListener("mouseenter", () => {
//         state2 = true
//     })
//     ////
//     if (headerMenu_underlist.getAttribute("aria-label") === "hasSubList") {
//         headerMenu_underlist.querySelectorAll(".underlist_li").forEach(underlist_li => {
//             // mouse position related to layer2Underlist if exists
//             let state3 = false
//             underlist_li.addEventListener("mouseenter", () => {
//                 state3 = true
//                 console.log("wwwww");
//                 underlist_li.querySelector(".layer2Underlist").classList.remove("dispNone")
//                 setTimeout(() => {
//                     underlist_li.querySelector(".layer2Underlist").classList.remove("hidden")
//                 }, 1);
//             })
//             underlist_li.addEventListener("mouseleave", () => {
//                 setTimeout(() => {
//                     if ((!state3)) {
//                         underlist_li.querySelector(".layer2Underlist").classList.add("hidden")
//                         setTimeout(() => {
//                             underlist_li.querySelector(".layer2Underlist").classList.add("dispNone")
//                         }, 10);
//                     }
//                 }, 300);
//                 state3 = false
//             })
//             // underlist_li.querySelector(".layer2Underlist").addEventListener("mouseenter", () => {
//             //     state3 = true
//             // })
//             underlist_li.querySelector(".layer2Underlist").addEventListener("mouseleave", () => {
//                 state3 = false
//             })
//         })
//     }
// })





// let L1GlobalState = false
// let L2GlobalState = false
// document.querySelector("header").querySelectorAll(".flashes").forEach((flash) => {
//     const headerMenu_li = flash.parentElement.parentElement
//     const headerMenu_underlist = headerMenu_li.querySelector(".headerMenu_underlist")
//     // mouse position related to headerMenu_li
//     let state1 = false
//     // mouse position related to headerMenu_underlist
//     let state2 = false
//     headerMenu_li.addEventListener("mouseenter", () => {
//         if (!L1GlobalState) {
//             state1 = true
//             L1GlobalState = true
//             headerMenu_underlist.classList.remove("dispNone")
//             setTimeout(() => {
//                 headerMenu_underlist.classList.remove("hidden")
//             }, 1);
//         }
//     })
//     headerMenu_li.addEventListener("mouseleave", () => {
//         setTimeout(() => {
//             if (!state2) {
//                 setTimeout(() => {
//                     headerMenu_underlist.classList.add("dispNone")
//                 }, 10);
//                 setTimeout(() => {
//                     L1GlobalState = false
//                 }, 10);
//                 headerMenu_underlist.classList.add("hidden")
//             }
//         }, 300);
//     })
//     headerMenu_underlist.addEventListener("mouseleave", () => {
//         state2 = false
//     })
//     headerMenu_underlist.addEventListener("mouseenter", () => {
//         state2 = true
//     })
//     ////
//     if (headerMenu_underlist.getAttribute("aria-label") === "hasSubList") {
//         headerMenu_underlist.querySelectorAll(".underlist_li").forEach(underlist_li => {
//             // mouse position related to layer2Underlist if exists
//             let state3 = false
//             underlist_li.addEventListener("mouseenter", () => {
//                 state3 = true
//                 console.log("wwwww");
//                 underlist_li.querySelector(".layer2Underlist").classList.remove("dispNone")
//                 setTimeout(() => {
//                     underlist_li.querySelector(".layer2Underlist").classList.remove("hidden")
//                 }, 1);
//             })
//             underlist_li.addEventListener("mouseleave", () => {
//                 setTimeout(() => {
//                     if ((!state3)) {
//                         underlist_li.querySelector(".layer2Underlist").classList.add("hidden")
//                         setTimeout(() => {
//                             underlist_li.querySelector(".layer2Underlist").classList.add("dispNone")
//                         }, 10);
//                     }
//                 }, 300);
//                 state3 = false
//             })
//             // underlist_li.querySelector(".layer2Underlist").addEventListener("mouseenter", () => {
//             //     state3 = true
//             // })
//             underlist_li.querySelector(".layer2Underlist").addEventListener("mouseleave", () => {
//                 state3 = false
//             })
//         })
//     }
// })






// the old version of below code

// // the new version of above code
// document.querySelector("header").querySelectorAll(".flashes").forEach((flash) => {
//     //headerMenu_li
//     const element = flash.parentElement.parentElement
//     const underList = element.querySelector(".headerMenu_underlist")
//     let allow = true
//     // mouse position related to headerMenu_li
//     let state1 = false
//     // mouse position related to headerMenu_underlist
//     let state2 = false
//     element.addEventListener("mouseenter", () => {
//         if (allow) {
//             state1 = true
//             underList.classList.remove("dispNone")
//             setTimeout(() => {
//                 underList.classList.remove("hidden")
//             }, 1);
//         }
//     })
//     element.addEventListener("mouseleave", () => {
//         //underList.classList.remove("hidden")
//         if (!(state1 && state2)) {
//             allow = false
//             underList.classList.add("hidden")
//             setTimeout(() => {
//                 console.log({ state1, state2 });
//                 underList.classList.add("dispNone")
//                 allow = true
//             }, 400);
//         }

//     })
//     element.querySelector(".headerMenu_underlist").addEventListener("mouseenter", () => {
//         state2 = true
//         // underList.classList.remove("dispNone")
//     })
//     element.querySelector(".headerMenu_underlist").addEventListener("mouseleave", () => {
//         state2 = false

//         allow = false
//         if (!(state1 && state2)) {
//             underList.classList.add("hidden")
//         }
//         setTimeout(() => {
//             console.log({ state1, state2 });
//             if (!(state1)) {
//                 underList.classList.add("dispNone")
//             }
//             allow = true
//         }, 400);


//         // setTimeout(() => {
//         //     console.log({ state1, state2 });
//         //     if (!(state1)) {
//         //         underList.classList.add("dispNone")
//         //     }
//         // }, 10);
//         // setTimeout(() => {
//         //     if (!(state1 && state2)) {
//         //         underList.classList.add("hidden")
//         //     }
//         // }, 0);
//     })
// })
// document.querySelector("header").querySelectorAll(".headerMenu_underlist").forEach((flash) => {
// })
const swipperWrapper = document.querySelector(".swipperWrapper")
const image1 = swipperWrapper.querySelectorAll(".handIcon")[0]
const image2 = swipperWrapper.querySelectorAll(".handIcon")[1]
swipperWrapper.addEventListener("mouseenter", () => {
    if (image2.classList.contains("hidden")) {
        image1.classList.add("hidden")
    }
    if (!image1.classList.contains("dispNone")) {
        image2.classList.remove("dispNone")
    }
    setTimeout(() => {
        if (!image2.classList.contains("dispNone")) {
            image1.classList.add("dispNone")
        }
        if (image1.classList.contains("hidden")) {
            image2.classList.remove("hidden")
        }
    }, 400);
})
swipperWrapper.addEventListener("mouseleave", () => {
    if (image1.classList.contains("hidden")) {
        image2.classList.add("hidden")
    }
    if (!image2.classList.contains("dispNone")) {
        image1.classList.remove("dispNone")
    }
    setTimeout(() => {
        if (!image1.classList.contains("dispNone")) {
            image2.classList.add("dispNone")
        }
        if (image2.classList.contains("hidden")) {
            image1.classList.remove("hidden")
        }
    }, 400);
})

const posBlueUnderLine = {
    midNavElement: document,
    overviewElement: document,
    feautersElement: document
}
//for min nav blue underline
const midNav_list = document.querySelector(".midNav_list")
const blueUnderline = midNav_list.querySelector(".blueUnderline")
const initial = midNav_list.querySelectorAll(".midNavLink-li")[0]

posBlueUnderLine.midNavElement = midNav_list.querySelectorAll(".midNavLink-li")[0]

blueUnderline.style.width = `${initial.clientWidth}px`
blueUnderline.style.left = `${initial.offsetLeft}px`
midNav_list.querySelectorAll(".midNavLink-li").forEach(midNavLinkLi => {
    midNavLinkLi.addEventListener("click", () => {
        posBlueUnderLine.midNavElement = midNavLinkLi
        blueUnderline.style.width = `${midNavLinkLi.clientWidth}px`
        blueUnderline.style.left = `${midNavLinkLi.offsetLeft}px`
    })

})
//for overview blue underline
const overviewList = document.querySelector(".overviewList")
const blueUnderline2 = overviewList.querySelector(".blueUnderline")
const initial2 = overviewList.querySelectorAll(".overviewLi")[1]
posBlueUnderLine.overviewElement = overviewList.querySelectorAll(".overviewLi")[1]
blueUnderline2.style.width = `${initial2.clientWidth}px`
blueUnderline2.style.left = `${initial2.offsetLeft}px`
overviewList.querySelectorAll(".overviewLi").forEach((overviewLi, index) => {
    overviewLi.addEventListener("click", () => {
        posBlueUnderLine.overviewElement = overviewLi
        blueUnderline2.style.width = `${overviewLi.clientWidth}px`
        blueUnderline2.style.left = `${overviewLi.offsetLeft}px`
        switch (index) {
            case 2:
                document
                    .querySelector(".overview_body")
                    .innerHTML = `
                        <div class="gallery">
                            <div class="galleryImageWrappers">
                                <img class="galleryImage" src="images/sg10-gallery1.webp">
                            </div>
                            <div class="galleryImageWrappers">
                                <img class="galleryImage" src="images/sg10-gallery2-768x576.webp">
                            </div>
                            <div class="galleryImageWrappers">
                                <img class="galleryImage" src="images/sg10-gallery3-768x576.webp">
                            </div>
                            <div class="galleryImageWrappers">
                                <img class="galleryImage" src="images/sg10-gallery4-768x576.webp">
                            </div>
                            <div class="galleryImageWrappers">
                                <img class="galleryImage" src="images/sg10-gallery5-768x576.webp">
                            </div>
                            <div class="galleryImageWrappers">
                                <img class="galleryImage" src="images/sg10-gallery6-768x576.webp">
                            </div>
                            <div class="galleryImageWrappers">
                                <img class="galleryImage" src="images/sg10-gallery8-768x576.webp">
                            </div>
                            <div class="galleryImageWrappers">
                                <img class="galleryImage" src="images/sg10-gallery9-768x576.webp">
                            </div>
                        </div>
                `
                document.querySelector(".overview_body").querySelectorAll(".galleryImageWrappers").forEach(elem => {
                    elem.addEventListener("click", () => {
                        console.log("zzzzz");
                    }, { once: true })
                })
                break;
            case 1:
                document.querySelector(".overview_body").innerHTML = ""
                document.querySelector(".overview_body").appendChild(overviewCard_wrapper)
                break;
            case 0:
                document
                    .querySelector(".overview_body")
                    .innerHTML = `
                        <div class="demensions_wrapper">
                            <img src="images/sg10-dimensions.svg"></img>
                        </div>
                `
                break;

        }
    })
})


//for feauters blue underline
const featuresList = document.querySelector(".featuresList")
const blueUnderline3 = featuresList.querySelector(".blueUnderline")
const initial3 = featuresList.querySelectorAll(".featuresLi")[0]
// images/sg10-f1-1536x864.webp
const features_body = document.querySelector(".features_body")

const featuresImg = features_body.querySelector("img")
const featuresH2 = features_body.querySelector("h2")
const featuresP = features_body.querySelector("p")

featuresImg.src = `images/${featuresData[0].src}`
featuresH2.innerText = featuresData[0].title
featuresP.innerText = featuresData[0].description
posBlueUnderLine.feautersElement = featuresList.querySelectorAll(".featuresLi")[0]
blueUnderline3.style.width = `${initial3.clientWidth}px`
blueUnderline3.style.left = `${initial3.offsetLeft}px`
featuresList.querySelectorAll(".featuresLi").forEach((featuresLi, index) => {
    featuresLi.addEventListener("click", () => {
        posBlueUnderLine.feautersElement = featuresLi
        blueUnderline3.style.width = `${featuresLi.clientWidth}px`
        blueUnderline3.style.left = `${featuresLi.offsetLeft}px`

        featuresImg.src = `images/${featuresData[index].src}`
        featuresH2.innerText = featuresData[index].title
        featuresP.innerText = featuresData[index].description

    })
})
// document.querySelector(".overview_body").appendChild(overviewCard_wrapper)

//for both overview and mid nav
window.onresize = function () {
    const pos = posBlueUnderLine.midNavElement

    blueUnderline.style.width = `${pos.clientWidth}px`
    blueUnderline.style.left = `${pos.offsetLeft}px`

    const pos2 = posBlueUnderLine.overviewElement
    blueUnderline2.style.width = `${pos2.clientWidth}px`
    blueUnderline2.style.left = `${pos2.offsetLeft}px`

    const pos3 = posBlueUnderLine.feautersElement
    blueUnderline3.style.width = `${pos3.clientWidth}px`
    blueUnderline3.style.left = `${pos3.offsetLeft}px`
};

document.querySelector(".overview_body").appendChild(overviewCard_wrapper)
