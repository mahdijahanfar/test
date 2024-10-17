const questionsData = [
    {
        ask: "چگونه می توانم نسخه معمولی کندانسور سیاه/آلومینیوم SG10 را خریداری کنم؟",
        answer: "پس از تولید و ارسال نسخه مسی SG10، ما شروع به ساخت نسخه آلومینیومی خواهیم کرد، بنابراین ETA پایان سه ماهه دوم سال 2024 است."
    },
    {
        ask: "چگونه نسخه مسی نسخه محدود SG10 را خریداری کنم؟",
        answer: "SG10 Copper Edition یک سری تولید محدود از SG10 است که دارای یک کندانسور کاملا مسی است. این نسخه ویژه از SG10 به انجمن Kickstarter به عنوان نشانه قدردانی از پشتیبانی پروژه آنها اختصاص داده شده است. همه 500 واحد به آنها اختصاص داده شده است، اما همه حامیان هنوز این محصول را نمی خواهند، بنابراین آن واحدهای ناخواسته در دسترس عموم قرار خواهند گرفت. برای خرید یکی، ابتدا باید یک کوپن تعهد از Calyos خریداری کنید تا آنها بتوانند پول پشتیبان را پس دهند و آن واحد را برای خرید در دسترس شما قرار دهند. کوپن را می‌توانید از sg10.calyos-tm.com خریداری کنید، و هنگامی که این کوپن را دارید، می‌توانید از آن در فروشگاه Streacom استفاده کنید تا فرآیند خرید را در shop.streacom.com/products/sg10-copper-edition-fanless فعال کنید. -gaming-case ارزش کل کوپن از قیمت خرده فروشی در هنگام تسویه حساب تخفیف داده می شود."
    },
    {
        ask: "اگر سوالی داشته باشم که در لیست نیست چه باید انجام دهم؟",
        answer: 'اگر نمی توانید اطلاعات مورد نیاز خود را پیدا کنید، لطفاً با استفاده از پیوند "تماس با ما" در سمت راست بالای صفحه برای ما پیام ارسال کنید، بخش مربوطه را انتخاب کنید و ما با اطلاعات مربوطه پاسخ خواهیم داد.'
        , open: true
    },
]
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
            {
                x: "79%", y: "10%",
                name:
                    "کندانسور چند بر"
            },
            {
                x: "71%", y: "84%",
                name:
                    "لوله پر"
            },
            {
                x: "68%", y: "59%",
                name:
                    "تبخیر کننده"
            },
            {
                x: "20%", y: "37%",
                name:
                    "لاین های انعطاف پذیر"
            },
            {
                x: "23%", y: "76%",
                name:
                    "حلقه کندانسور"
            },
            {
                x: "79%", y: "60%",
                name:
                    "فن های خنک کننده"
            },
        ],
        src: "sg10-f1-1536x864.webp",
        description: "در قلب SG10 و چیزی که این عملکرد خنک کننده را ممکن می کند، سیستم Loop Heat Pipe (LHP) داخل آن است. برخلاف لوله های حرارتی سنتی، که در آن تغییر فاز سیال عامل در جهت های مخالف در داخل لوله اتفاق می افتد، چرخه تغییر فاز LHP در یک جریان پیوسته در اطراف حلقه اتفاق می افتد. فناوری هسته ای که این امکان را فراهم می کند اواپراتور است، دارای یک پمپ مویرگی حالت جامد (بدون قطعات متحرک) است که یک جریان بخار تحت فشار را به داخل کندانسور ایجاد می کند، جایی که دوباره به مایع خنک می شود و سپس به اواپراتور جریان می یابد، جایی که چرخه تکرار می شود.",
        title: "لوله حرارتی حلقه ای"
    }, {
        tags: [
            { x: "17%", y: "60%", name: "فن های خنک کننده" },
            { x: "49%", y: "60%", name: "حلقه کندانسور" },
            { x: "77%", y: "60%", name: "لاینهای انعطاف پذیر" },
        ],
        src: "sg10-f2-1536x864.webp",
        description: "SG10 با قابلیت تنظیم کامل موقعیت X & Y مادربرد و پردازنده گرافیکی با آزادی کامل، انعطاف پذیری را به سطح بعدی ارتقا می دهد. این سطح از تنظیم همراه با لوله های LHP انعطاف پذیر به این معنی است که سازگاری بسیار فراتر از آن چیزی است که با خنک کننده لوله حرارتی قبلی امکان پذیر است. یک مثال عالی از این انعطاف‌پذیری، توانایی نصب دو مادربرد Mini-ITX (و دو PSU) در صورت عدم نیاز به یک GPU محتاط، ایجاد یک رایانه بدون فن با سیستم دوگانه است.",
        title: "براکت های مدولار X-FRAME"
    }, {
        tags: [
            { x: "67%", y: "44%", name: "فن های خنک کننده" },
            { x: "56%", y: "65%", name: "حلقه کندانسور" },
            { x: "48%", y: "29%", name: "لاینهای انعطاف پذیر" },
            { x: "34%", y: "53%", name: "لاینهای انعطاف پذیر" },
            { x: "18%", y: "56%", name: "لاینهای انعطاف پذیر" },
            { x: "34%", y: "31%", name: "لاینهای انعطاف پذیر" },
        ],
        src: "sg10-f3-1536x864.webp",
        description: "ز آنجایی که LHP و کل محلول خنک‌کننده قطعات جدایی‌ناپذیر کیس هستند، ایجاد یک راه‌حل نصب همه‌کاره که در صورت تغییر مجدد مشخصات سوکت، در آینده به راحتی قابل تطبیق باشد، ضروری است. راه حل ارائه شده بسیار ماژولار است و امکان تطبیق سریع با مکان های سوراخ جدید و الزامات ارتفاع z را فراهم می کند.",
        title: "نصب CPU همه کاره"
    }, {
        tags: [
            { x: "20%", y: "36%", name: "فن های خنک کننده" },
            { x: "30%", y: "61%", name: "حلقه کندانسور" },
            { x: "47%", y: "58%", name: "لاینهای انعطاف پذیر" },
            { x: "58%", y: "47%", name: "لاینهای انعطاف پذیر" },
            { x: "59%", y: "38%", name: "لاینهای انعطاف پذیر" },
            { x: "55%", y: "65%", name: "لاینهای انعطاف پذیر" },
            { x: "68%", y: "65%", name: "لاینهای انعطاف پذیر" },
            { x: "86%", y: "66%", name: "لاینهای انعطاف پذیر" },
        ],
        src: "sg10-f4-1536x864.webp",
        description: "یکی از بزرگترین چالش های این محصول، سازگاری با پردازنده گرافیکی بوده است. برای غلبه بر مسئله طرح‌بندی‌های بسیار متفاوت و قرار دادن اجزا، ما یک رویکرد ماژولار با تجهیزات خنک‌کننده GPU DIE، VRAM و VRM مستقل اتخاذ کرده‌ایم. VRM از سینک های حرارتی مستقل استفاده می کند و VRAM با DIE از طریق صفحات سرد سفارشی خنک می شود.",
        title: "خنک کننده پردازنده گرافیکی مدولار"
    }, {
        tags: [
            { x: "66%", y: "55%", name: "فن های خنک کننده" },
            { x: "64%", y: "31%", name: "حلقه کندانسور" },
            { x: "34%", y: "31%", name: "لاینهای انعطاف پذیر" },
        ],
        src: "sg10-f5-1536x864.webp",
        description: "عملکرد 600 وات خنک کننده بدون فن پیشگامانه قابل توجه است، اما اگر قطعات پیشرفته نیاز بیشتری داشته باشند چه؟ به جای ایجاد یک سناریوی همه یا هیچ، SG10 می تواند فن ها را در خود جای دهد و عملکرد خنک کننده را 15020 درصد افزایش دهد و در عین حال امکان عملکرد تقریباً بی صدا را فراهم کند. فن های 120 میلی متری بوسیله ریل ها پشتیبانی می شوند و فن های بزرگتر را می توان با براکت ها استفاده کرد.",
        title: "فراتر از 600 وات"
    }, {
        tags: [
            { x: "48%", y: "65%", name: "فن های خنک کننده" },
            { x: "70%", y: "82%", name: "حلقه کندانسور" },
        ],
        src: "sg10-f6-1536x864.webp",
        description: "مکان دکمه پاور / درگاه های جلو را دوست ندارید؟ مشکلی نیست! می توان آن را تقریباً در هر جایی در جلو (یا پشت) قاب قرار داد زیرا می توان آن را در هر نقطه در امتداد تخته ها و بین هر دو محکم کرد. ماژول‌های IO اضافی نیز برای افزودن گزینه‌هایی برای پورت‌های بیشتر بر اساس بازخورد مشتری در دسترس خواهند بود.",
        title: "ماژول های IO متحرک و قابل گسترش"
    }, {
        tags: [
            { x: "54%", y: "69%", name: "فن های خنک کننده" },
            { x: "42%", y: "60%", name: "حلقه کندانسور" },
            { x: "36%", y: "85%", name: "لاینهای انعطاف پذیر" },
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


SpriteSpin.create({
    target: '.swipper',
    source: SpriteSpin.source('images/sg10-360_{frame}.webp', {
        frame: [1, 24],
        digits: 2
    })
    , animate: false,
})

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

const posBlueUnderLines = {
    midNavElement: document,
    overviewElement: document,
    feautersElement: document,
    supportElement: document
}
//for min nav blue underline
const midNav_list = document.querySelector(".midNav_list")
const blueUnderline = midNav_list.querySelector(".blueUnderline")
const initial = midNav_list.querySelectorAll(".midNavLink-li")[0]

posBlueUnderLines.midNavElement = midNav_list.querySelectorAll(".midNavLink-li")[0]

blueUnderline.style.width = `${initial.clientWidth}px`
blueUnderline.style.left = `${initial.offsetLeft}px`
midNav_list.querySelectorAll(".midNavLink-li").forEach(midNavLinkLi => {
    midNavLinkLi.addEventListener("click", () => {
        posBlueUnderLines.midNavElement = midNavLinkLi
        blueUnderline.style.width = `${midNavLinkLi.clientWidth}px`
        blueUnderline.style.left = `${midNavLinkLi.offsetLeft}px`
    })

})

//for overview blue underline
const overviewList = document.querySelector(".overviewList")
const blueUnderline2 = overviewList.querySelector(".blueUnderline")
const initial2 = overviewList.querySelectorAll(".overviewLi")[1]
posBlueUnderLines.overviewElement = overviewList.querySelectorAll(".overviewLi")[1]
blueUnderline2.style.width = `${initial2.clientWidth}px`
blueUnderline2.style.left = `${initial2.offsetLeft}px`
overviewList.querySelectorAll(".overviewLi").forEach((overviewLi, index) => {
    overviewLi.addEventListener("click", () => {
        posBlueUnderLines.overviewElement = overviewLi
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

const features_imgWraper = features_body.querySelector(".features_img-wraper")

features_imgWraper.querySelectorAll(".plusTag_wrapper").forEach(element => element.remove())
featuresData[0].tags.forEach(({ name, x, y }) => {
    const plusTag_wrapper = document.createElement("div")
    plusTag_wrapper.style.left = x
    plusTag_wrapper.style.top = y
    plusTag_wrapper.classList.add("plusTag_wrapper")
    plusTag_wrapper.innerHTML = `
        <svg class="plusTag" width="2rem" height="2rem" viewBox="0 0 20 20" data-svg="marker">
            <rect x="9" y="4" width="1" height="11"></rect>
            <rect x="4" y="9" width="11" height="1"></rect>
        </svg>
        <div class="tagTxt dispNone hidden">${name}</div>
    `
    features_imgWraper.appendChild(plusTag_wrapper)
})
features_body.querySelectorAll(".plusTag_wrapper").forEach((plusTag_wrapper) => {
    let isMouseleaveCompleted = true
    plusTag_wrapper.addEventListener("mouseenter", () => {
        if (isMouseleaveCompleted) {
            plusTag_wrapper.querySelector(".tagTxt").classList.remove("dispNone")
            setTimeout(() => {
                plusTag_wrapper.querySelector(".tagTxt").classList.remove("hidden")
            }, 400);
        }
    })
    plusTag_wrapper.addEventListener("mouseleave", () => {
        isMouseleaveCompleted = false
        plusTag_wrapper.querySelector(".tagTxt").classList.add("hidden")
        setTimeout(() => {
            isMouseleaveCompleted = true
            plusTag_wrapper.querySelector(".tagTxt").classList.add("dispNone")
        }, 400);
    })
})

posBlueUnderLines.feautersElement = featuresList.querySelectorAll(".featuresLi")[0]
blueUnderline3.style.width = `${initial3.clientWidth}px`
blueUnderline3.style.left = `${initial3.offsetLeft}px`
featuresList.querySelectorAll(".featuresLi").forEach((featuresLi, index) => {
    featuresLi.addEventListener("click", () => {
        posBlueUnderLines.feautersElement = featuresLi
        blueUnderline3.style.width = `${featuresLi.clientWidth}px`
        blueUnderline3.style.left = `${featuresLi.offsetLeft}px`

        featuresImg.src = `images/${featuresData[index].src}`
        featuresH2.innerText = featuresData[index].title
        featuresP.innerText = featuresData[index].description

        const features_imgWraper = features_body.querySelector(".features_img-wraper")
        features_imgWraper.querySelectorAll(".plusTag_wrapper").forEach(element => element.remove())
        featuresData[index].tags.forEach(({ name, x, y }) => {
            const plusTag_wrapper = document.createElement("div")
            plusTag_wrapper.style.left = x
            plusTag_wrapper.style.top = y
            plusTag_wrapper.classList.add("plusTag_wrapper")
            plusTag_wrapper.innerHTML = `
                <svg class="plusTag" width="2rem" height="2rem" viewBox="0 0 20 20" data-svg="marker">
                    <rect x="9" y="4" width="1" height="11"></rect>
                    <rect x="4" y="9" width="11" height="1"></rect>
                </svg>
                <div class="tagTxt dispNone hidden">${name}</div>
            `
            features_imgWraper.appendChild(plusTag_wrapper)
        })
        features_body.querySelectorAll(".plusTag_wrapper").forEach((plusTag_wrapper) => {
            let isMouseleaveCompleted = true
            plusTag_wrapper.addEventListener("mouseenter", () => {
                if (isMouseleaveCompleted) {
                    plusTag_wrapper.querySelector(".tagTxt").classList.remove("dispNone")
                    setTimeout(() => {
                        plusTag_wrapper.querySelector(".tagTxt").classList.remove("hidden")
                    }, 400);
                }
            })
            plusTag_wrapper.addEventListener("mouseleave", () => {
                isMouseleaveCompleted = false
                plusTag_wrapper.querySelector(".tagTxt").classList.add("hidden")
                setTimeout(() => {
                    isMouseleaveCompleted = true
                    plusTag_wrapper.querySelector(".tagTxt").classList.add("dispNone")
                }, 400);
            })
        })
    })
})
// document.querySelector(".overview_body").appendChild(overviewCard_wrapper)

//for support blue underline
const supportList = document.querySelector(".supportList")
const blueUnderline4 = supportList.querySelector(".blueUnderline")
const initial4 = supportList.querySelectorAll(".supportLi")[0]
const support_body = document.querySelector(".support_body")
function showQuestionsWraper() {
    support_body.innerHTML = ""
    console.log("ffff");
    const questionsWrapper = document.createElement("div")
    questionsWrapper.classList.add("questionsWrapper")
    questionsData.forEach(({ ask, answer, open }) => {
        questionsWrapper.innerHTML += `
            <div aria-label="${open ? "open" : "close"}" class="questions">
                <div class="questions_header">
                    <p class="questions_ask">${ask}</p>

                    <svg class="plusTag_questions" width="2rem" height="2rem" viewBox="0 0 20 20"
                        data-svg="marker">
                        <rect x="9" y="4" width="1" height="11"></rect>
                        <rect x="4" y="9" width="11" height="1"></rect>
                    </svg>
                </div>
                <div class="questions_answer">${answer}</div>
            </div>
        `
    })
    support_body.appendChild(questionsWrapper)
    questionsWrapper.querySelectorAll(".questions").forEach((question, indexOfSelectedQuestion) => {
        if (question.getAttribute("aria-label") === "open") {
            // opening the question which should be opened initialy
            question.querySelector(".plusTag_questions").classList.add("plusTag_questions__close")
            question.querySelector(".questions_answer").classList.add("questions_answer__open")
            question.setAttribute("aria-label", "open")
        }

        question.querySelector(".questions_header").addEventListener("click", () => {
            if (question.getAttribute("aria-label") === "open") {
                // closing question
                question.querySelector(".plusTag_questions").classList.remove("plusTag_questions__close")
                question.querySelector(".questions_answer").classList.remove("questions_answer__open")
                question.setAttribute("aria-label", "close")
            } else {
                // opening question
                question.querySelector(".plusTag_questions").classList.add("plusTag_questions__close")
                question.querySelector(".questions_answer").classList.add("questions_answer__open")
                question.setAttribute("aria-label", "open")
                //closing the other ones
                questionsWrapper.querySelectorAll(".questions").forEach((otherQuestion, indexOfOthers) => {
                    if (indexOfOthers !== indexOfSelectedQuestion) {
                        otherQuestion.querySelector(".plusTag_questions").classList.remove("plusTag_questions__close")
                        otherQuestion.querySelector(".questions_answer").classList.remove("questions_answer__open")
                        otherQuestion.setAttribute("aria-label", "close")
                    }
                })
            }
        })
    })
}
showQuestionsWraper()
function showDownloadWraper() {
    support_body.innerHTML = ""
    const downloadWrapper = document.createElement("a")
    downloadWrapper.classList.add("downloadWrapper")
    downloadWrapper.setAttribute("href", "https://streacom.com/downloads/mk/sg10_product_intro.pdf")
    downloadWrapper.setAttribute("target", "_blank")
    downloadWrapper.innerHTML = `
    <img class="download_img" src="images/information.gif" alt="" srcset="">
    <div>
        <h2>SG10</h2>
        <p>معرفی محصول</p>
        <p>فایل دانلود</p>
        <p>PDF , 7.9MB</p>
    </div>
    `
    support_body.appendChild(downloadWrapper)
}
posBlueUnderLines.supportElement = supportList.querySelectorAll(".supportLi")[0]

blueUnderline4.style.width = `${initial4.clientWidth}px`
blueUnderline4.style.left = `${initial4.offsetLeft}px`
supportList.querySelectorAll(".supportLi").forEach((supportLi, index) => {
    supportLi.addEventListener("click", () => {
        posBlueUnderLines.supportElement = supportLi
        blueUnderline4.style.width = `${supportLi.clientWidth}px`
        blueUnderline4.style.left = `${supportLi.offsetLeft}px`
        switch (index) {
            case 0: showQuestionsWraper()
                break;
            case 1:
                showDownloadWraper()
                break;
        }
    })
})

//for overview and midNav and features and support while resizing
window.onresize = function () {
    const pos = posBlueUnderLines.midNavElement

    blueUnderline.style.width = `${pos.clientWidth}px`
    blueUnderline.style.left = `${pos.offsetLeft}px`

    const pos2 = posBlueUnderLines.overviewElement
    blueUnderline2.style.width = `${pos2.clientWidth}px`
    blueUnderline2.style.left = `${pos2.offsetLeft}px`

    const pos3 = posBlueUnderLines.feautersElement
    blueUnderline3.style.width = `${pos3.clientWidth}px`
    blueUnderline3.style.left = `${pos3.offsetLeft}px`

    const pos4 = posBlueUnderLines.supportElement
    blueUnderline4.style.width = `${pos4.clientWidth}px`
    blueUnderline4.style.left = `${pos4.offsetLeft}px`
};

document.querySelector(".overview_body").appendChild(overviewCard_wrapper)

var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,

    slidesPerView: 1,
    breakpoints: {
        993: {
            slidesPerView: 2,
        },
        500: {
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        }
    }
});
