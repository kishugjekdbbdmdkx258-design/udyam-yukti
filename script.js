function loginUser(event) {
    event.preventDefault();

    const mobile = document.getElementById("mobile").value.trim();
    const password = document.getElementById("password").value;
    const message = document.getElementById("loginMessage");

    if (mobile.length !== 10 || isNaN(mobile)) {
        message.style.color = "#dc2626";
        message.textContent = "कृपया 10 अंकों का मोबाइल नंबर डालें।";
        return;
    }

    if (password.length < 4) {
        message.style.color = "#dc2626";
        message.textContent = "पासवर्ड कम से कम 4 अक्षर का होना चाहिए।";
        return;
    }

    const savedUser = localStorage.getItem("udyamUser");

    if (!savedUser) {
        message.style.color = "#dc2626";
        message.textContent = "पहले अपना खाता बनाएं।";
        return;
    }

    const user = JSON.parse(savedUser);

    if (user.mobile !== mobile || user.password !== password) {
        message.style.color = "#dc2626";
        message.textContent = "मोबाइल नंबर या पासवर्ड गलत है।";
        return;
    }

    window.location.href = "dashboard.html";
}


function showSignup() {
    window.location.href = "register.html";
}


function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById("fullName").value.trim();
    const age = document.getElementById("age").value;
    const state = document.getElementById("state").value;
    const district = document.getElementById("district").value.trim();
    const village = document.getElementById("village").value.trim();
    const business = document.getElementById("business").value;
    const mobile = document.getElementById("registerMobile").value.trim();
    const password = document.getElementById("registerPassword").value;
    const message = document.getElementById("registerMessage");

    if (mobile.length !== 10 || isNaN(mobile)) {
        message.style.color = "#dc2626";
        message.textContent = "कृपया सही 10 अंकों का मोबाइल नंबर डालें।";
        return;
    }

    if (password.length < 4) {
        message.style.color = "#dc2626";
        message.textContent = "पासवर्ड कम से कम 4 अक्षर का होना चाहिए।";
        return;
    }

    const userData = {
        name: name,
        age: age,
        state: state,
        district: district,
        village: village,
        business: business,
        mobile: mobile,
        password: password
    };

    localStorage.setItem("udyamUser", JSON.stringify(userData));

    message.style.color = "#15803d";
    message.textContent = "खाता सफलतापूर्वक बन गया!";

    setTimeout(function () {
        window.location.href = "index.html";
    }, 1000);
}


function loadUserData() {
    const savedUser = localStorage.getItem("udyamUser");

    if (!savedUser) {
        return;
    }

    const user = JSON.parse(savedUser);

    const welcomeName = document.getElementById("welcomeName");
    const userLocation = document.getElementById("userLocation");

    if (welcomeName) {
        welcomeName.textContent = "Namaste " + user.name + " Ji! 🙏";
    }

    if (userLocation) {
        userLocation.textContent =
            "Aapka business: " +
            user.business +
            " | " +
            user.village +
            ", " +
            user.district +
            ", " +
            user.state;
    }
}


function openFeature(featureName) {
    const result = document.getElementById("featureResult");
    const title = document.getElementById("featureTitle");
    const text = document.getElementById("featureText");

    title.textContent = featureName;

    if (featureName === "Business Advice") {
        text.innerHTML = `
            <div class="advice-box">
                <h3>💡 व्यापार से जुड़ी सलाह</h3>
                <p>1. अपने आसपास के ग्राहकों की जरूरत समझें।</p>
                <p>2. छोटे बजट से व्यवसाय शुरू करें।</p>
                <p>3. रोज की कमाई और खर्च लिखें।</p>
                <p>4. अच्छी गुणवत्ता और सही दाम रखें।</p>
                <p>5. धीरे-धीरे अपने व्यवसाय को बढ़ाएं।</p>
            </div>
        `;

    } else if (featureName === "Business Loan Advisory") {
        text.innerHTML = `
            <div class="advice-box loan-advisory">

                <h3>💰 व्यवसाय लोन सहायता</h3>

                <p>
                    अपने व्यवसाय का कुल बजट और अपना योगदान डालें।
                    हम आपको अनुमानित लोन की जानकारी देंगे।
                </p>
   
                <label for="loanBudget">
                    कुल व्यवसाय बजट (₹)
                </label>

                <input
                    type="number"
                    id="loanBudget"
                    placeholder="जैसे 100000"
                    min="1"
                >

                <label for="ownMoney">
                    आप खुद कितना पैसा लगा सकते हैं? (₹)
                </label>

                <input
                    type="number"
                    id="ownMoney"
                    placeholder="जैसे 20000"
                    min="0"
                >

                <button onclick="calculateLoan()">
                    लोन की गणना करें
                </button>

                <div id="loanResult"></div>

            </div>
        `;

    } else if (featureName === "Government Schemes") {
        text.innerHTML = `
        <div class="advice-box">
            <h3>🏛️ सरकारी योजनाएँ</h3>

            <p>
                अपने व्यवसाय के लिए नीचे दी गई सरकारी योजनाओं की
                आसान जानकारी देखें।
            </p>

            <div class="scheme-card">
                <h3>💰 प्रधानमंत्री मुद्रा योजना / (PMMY)</h3>
                <p>
                    छोटे व्यवसाय, दुकान, सिलाई, खेती से जुड़े काम,
                    पशुपालन और अन्य छोटे कारोबार के लिए उपयोगी हो सकती है।
                </p>
                <p><strong>किसके लिए:</strong> छोटे व्यवसाय शुरू करने या बढ़ाने वाले लोग / Individuals starting or expanding small businesses</p>
                <button onclick="showSchemeInfo('mudra')">
                    जानकारी देखें / Learn More
                </button>
            </div>

            <div class="scheme-card">
                <h3>🏭 PMEGP योजना / (Prime Minister's Employment Generation Programme)</h3>
                <p>
                    नया छोटा व्यवसाय या रोजगार शुरू करने के लिए
                    सहायता और सब्सिडी की जानकारी मिल सकती है।
                </p>
                <p><strong>किसके लिए:</strong> नया व्यवसाय शुरू करने वाले लोग / New Business Entrepreneurs</p>
                <button onclick="showSchemeInfo('pmegp')">
                    जानकारी देखें / Learn More
                </button>
            </div>

            <div class="scheme-card">
                <h3>👩‍💼 महिला उद्यमी सहायता (For Bihar's Women & Transgender)</h3>
                <p>
                    महिलाओं द्वारा शुरू किए जाने वाले छोटे व्यवसायों
                    के लिए अलग-अलग बैंक और सरकारी योजनाएँ उपलब्ध हो सकती हैं।
                </p>
                <p><strong>किसके लिए:</strong> महिला व्यवसायी / Women & Transgender Entrepreneurs</p>
                <button onclick="showSchemeInfo('women')">
                    जानकारी देखें / Learn More
                </button>
            </div>

            <div id="schemeInfo" class="scheme-info"></div>

            <p class="small-note">
                ध्यान दें: योजना की पात्रता, राशि और मंजूरी बैंक तथा
                सरकारी नियमों पर निर्भर करती है।
            </p>
        </div>
    `;


    } else if (featureName === "Local Market") {
        text.innerHTML = `
            <div class="advice-box">
                <h3>📍 स्थानीय बाजार</h3>
                <p>
                    यहां आप अपने आसपास के बाजार, ग्राहकों और
                    प्रतियोगिता को समझ सकेंगे।
                </p>
            </div>
        `;
    }

    result.classList.remove("hidden");

    result.scrollIntoView({
        behavior: "smooth"
    });
}


function calculateLoan() {
    const budgetInput = document.getElementById("loanBudget");
    const ownMoneyInput = document.getElementById("ownMoney");
    const result = document.getElementById("loanResult");

    if (!budgetInput || !ownMoneyInput || !result) {
        alert("Loan form load nahi hua. Dashboard refresh karein.");
        return;
    }

    const budget = Number(budgetInput.value);
    const ownMoney = Number(ownMoneyInput.value);

    if (!budget || budget <= 0) {
        result.innerHTML = `
            <p style="color: #dc2626;">
                कृपया सही व्यवसाय बजट डालें।
            </p>
        `;
        return;
    }

    if (ownMoney < 0 || ownMoney > budget) {
        result.innerHTML = `
            <p style="color: #dc2626;">
                आपका अपना योगदान कुल बजट से ज्यादा नहीं हो सकता।
            </p>
        `;
        return;
    }

    const possibleLoan = budget - ownMoney;

    result.innerHTML = `
        <div class="advice-box">

            <h3>📊 आपकी लोन योजना</h3>

            <p>
                <strong>कुल व्यवसाय बजट:</strong>
                ₹${budget.toLocaleString("en-IN")}
            </p>

            <p>
                <strong>आपका अपना योगदान:</strong>
                ₹${ownMoney.toLocaleString("en-IN")}
            </p>

            <p>
                <strong>अनुमानित लोन राशि:</strong>
                ₹${possibleLoan.toLocaleString("en-IN")}
            </p>

            <hr>

            <h3>✅ लोन आवेदन से पहले तैयारी</h3>

            <div class="checklist-box">
                <label>
                    <input type="checkbox">
                    व्यवसाय का उद्देश्य तय है? / The business objective is clear?
                </label>

                <label>
                    <input type="checkbox">
                    अपना योगदान उपलब्ध है? / Your contribution is available?

                </label>

                <label>
                    <input type="checkbox">
                    Aadhaar Card उपलब्ध है? / Aadhaar Card is available?
                </label>

                <label>
                    <input type="checkbox">
                    बैंक खाता उपलब्ध है? / Bank account is available?

                </label>

                <label>
                    <input type="checkbox">
                    व्यवसाय का पता उपलब्ध है? / Business location is available?

                </label>

                <label>
                    <input type="checkbox">
                    व्यवसाय का छोटा योजना तैयार है? / A short business plan is ready?

                </label>
            </div>

            

            <div class="call-section">
                <h3>📞 अधिक जानकारी के लिए कॉल करें</h3>

                <p>
                    लोन से जुड़ी अधिक जानकारी के लिए हमारे
                    सहायता प्रतिनिधि से संपर्क करें।
                </p>

                <p>
                    <strong>सहायता नंबर:</strong> 9507808055
                </p>

                <a href="tel:9507808055" class="call-button">
                    📞 अभी कॉल करें
                </a>
            </div>

            <hr>

            <h3>⚠️ जरूरी जानकारी / Essential Information</h3>

            <p>
                यह केवल demo calculation है।
                वास्तविक loan amount बैंक, सरकारी योजना,
                पात्रता, documents और credit history पर निर्भर करेगा।
                हर योजना में 10% अपना योगदान और 90% loan होना जरूरी नहीं है।
            </p>

        </div>
    `;
}


function goBack() {
    document.getElementById("featureResult").classList.add("hidden");
}


function logoutUser() {
    window.location.href = "index.html";
}


loadUserData();
function showSchemeInfo(schemeName) {
    const schemeInfo = document.getElementById("schemeInfo");

    if (!schemeInfo) {
        return;
    }

    if (schemeName === "mudra") {
        schemeInfo.innerHTML = `
            <div class="scheme-detail-box">

                <h2>💰 प्रधानमंत्री मुद्रा योजना</h2>

                <p>
                    प्रधानमंत्री मुद्रा योजना के अंतर्गत छोटे व्यवसाय
                    शुरू करने या बढ़ाने के लिए लोन की जानकारी प्राप्त कर सकते हैं।
                </p>

                <hr>

                <h3>1️⃣ योग्यता जांचें (Check Eligibility)</h3>

                <p>
                    सबसे पहले आपको देखना होगा कि आप किस कैटेगरी में लोन
                    लेना चाहती हैं:
                </p>

                <ul>
                    <li>
                        <strong>शिशु (Shishu):</strong>
                        ₹50,000 तक के छोटे काम के लिए।
                    </li>

                    <li>
                        <strong>किशोर (Kishore):</strong>
                        ₹50,001 से ₹5 लाख तक के लिए।
                    </li>

                    <li>
                        <strong>तरुण (Tarun):</strong>
                        ₹5 लाख से ₹10 लाख तक के लिए।
                    </li>

                    <li>
                        <strong>तरुण+ (Tarun+):</strong>
                        ₹10 लाख से ₹20 लाख तक के लिए।
                    </li>
                </ul>

                <hr>

                <h3>2️⃣ दस्तावेज़ तैयार रखें (Documents Ready)</h3>

                <p>
                    आवेदन करने से पहले नीचे दिए गए कागज़ात तैयार रखें:
                </p>

                <ul>
                    <li>
                        <strong>पहचान और पता प्रमाण:</strong>
                        आधार कार्ड और पैन कार्ड।
                    </li>

                    <li>
                        <strong>बिजनेस का प्रमाण:</strong>
                        दुकान या उद्योग होने पर उद्यम रजिस्ट्रेशन सर्टिफिकेट।
                    </li>

                    <li>
                        <strong>बैंक स्टेटमेंट:</strong>
                        पिछले 6 महीने का बैंक पासबुक या स्टेटमेंट।
                    </li>

                    <li>
                        <strong>प्रोजेक्ट रिपोर्ट:</strong>
                        ₹50,000 से ऊपर के लोन के लिए पैसे का उपयोग और
                        अनुमानित मुनाफे की छोटी रिपोर्ट।
                    </li>
                </ul>

                <hr>

                <h3>3️⃣ पोर्टल पर रजिस्ट्रेशन (Registration)</h3>

                <ol>
                    <li>
                        सबसे पहले सरकार के
                        <a
                            href="https://www.jansamarth.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <strong>JanSamarth Portal</strong>
                        </a>
                        पर जाएं।
                    </li>

                    <li>
                        होमपेज पर
                        <strong>Business Activity Loan</strong>
                        विकल्प चुनें।
                    </li>

                    <li>
                        अब
                        <strong>Check Eligibility</strong>
                        पर क्लिक करें।
                    </li>

                    <li>
                        कुछ आसान सवालों के जवाब दें, जैसे नया या पुराना
                        बिजनेस, जेंडर और सामाजिक श्रेणी।
                    </li>

                    <li>
                        इसके बाद
                        <strong>प्रधानमंत्री मुद्रा योजना</strong>
                        का विकल्प दिखाई दे सकता है।
                    </li>

                    <li>
                        अब
                        <strong>Log in to Apply</strong>
                        पर क्लिक करें।
                    </li>

                    <li>
                        मोबाइल नंबर और कैप्चा भरकर मोबाइल पर आए OTP को
                        वेरीफाई करें।
                    </li>

                    <li>
                        अपनी ईमेल आईडी डालें, ईमेल पर आए OTP को वेरीफाई करें
                        और एक मजबूत पासवर्ड बनाएं।
                    </li>
                </ol>

                <hr>

                <h3>4️⃣ मुख्य आवेदन फॉर्म भरना (Fill Application)</h3>

                <p>
                    लॉग इन करने के बाद मुख्य आवेदन फॉर्म भरें:
                </p>

                <ul>
                    <li>
                        <strong>व्यापार की जानकारी:</strong>
                        बिजनेस का नाम, काम का प्रकार और पता भरें।
                    </li>

                    <li>
                        <strong>लोन की राशि:</strong>
                        आपको जितने रुपये का लोन चाहिए, वह राशि दर्ज करें।
                    </li>

                    <li>
                        <strong>दस्तावेज़ अपलोड:</strong>
                        आधार कार्ड, पैन कार्ड और उद्यम सर्टिफिकेट की फोटो
                        अपलोड करें।
                    </li>
                </ul>

                <hr>

                <h3>5️⃣ बैंक का चयन और सबमिट (Select Bank & Submit)</h3>

                <ul>
                    <li>
                        फॉर्म पूरा भरने के बाद पोर्टल पर उपलब्ध बैंकों की
                        लिस्ट और ब्याज दर की जानकारी देखें।
                    </li>

                    <li>
                        अपनी पसंद का बैंक चुनें, जैसे SBI, PNB या वह बैंक
                        जिसमें आपका पहले से खाता है।
                    </li>

                    <li>
                        अब <strong>Submit</strong> बटन दबाएं।
                    </li>

                    <li>
                        फॉर्म सबमिट होने के बाद मिलने वाला
                        <strong>Application Reference Number</strong>
                        संभालकर रखें।
                    </li>

                    <li>
                        इसके बाद संबंधित बैंक अधिकारी आपसे संपर्क कर सकते हैं।
                        डॉक्यूमेंट वेरिफिकेशन और बैंक की मंजूरी के बाद ही
                        लोन की प्रक्रिया आगे बढ़ेगी।
                    </li>
                </ul>

                <hr>

                <div class="call-section">
                    <p>
                        📞 अधिक जानकारी के लिए हमारे एजेंट से कॉल करें
                    </p>

                    <a
                        href="tel:9507808055"
                        class="call-button"
                    >
                        📞 एजेंट को कॉल करें
                    </a>
                </div>

                <p class="small-note">
                    ध्यान दें: लोन की पात्रता, राशि, ब्याज दर और मंजूरी
                    बैंक तथा सरकारी नियमों पर निर्भर करती है।
                </p>

            </div>
        `;
    }

    else if (schemeName === "pmegp") {
        schemeInfo.innerHTML = `
        <div class="scheme-detail-box">

            <h2>🏭 PMEGP योजना</h2>

            <p>
                PMEGP योजना के अंतर्गत नया छोटा व्यवसाय या रोजगार
                शुरू करने के लिए लोन और सरकारी सब्सिडी की जानकारी
                प्राप्त कर सकते हैं।
            </p>

            <hr>

            <h3>1️⃣ योग्यता और सब्सिडी (Eligibility & Subsidy Structure)</h3>

            <p>
                लोन अप्लाई करने से पहले अपनी कैटेगरी और प्रोजेक्ट का
                प्रकार समझें:
            </p>

            <ul>
                <li>
                    <strong>लोन की सीमा:</strong>
                    विनिर्माण क्षेत्र के लिए अधिकतम
                    <strong>₹50 लाख</strong> और सेवा क्षेत्र के लिए
                    अधिकतम <strong>₹20 लाख</strong>।
                </li>

                <li>
                    <strong>शिक्षा योग्यता:</strong>
                    यदि विनिर्माण में ₹10 लाख से ऊपर या सेवा क्षेत्र में
                    ₹5 लाख से ऊपर का लोन चाहते हैं, तो कम से कम
                    <strong>8वीं पास</strong> होना आवश्यक हो सकता है।
                </li>

                <li>
                    <strong>ग्रामीण क्षेत्र में सब्सिडी:</strong>
                    सामान्य वर्ग को <strong>25%</strong> और महिलाओं,
                    SC/ST/OBC जैसे विशेष वर्ग को <strong>35%</strong>
                    तक सब्सिडी मिल सकती है।
                </li>

                <li>
                    <strong>शहरी क्षेत्र में सब्सिडी:</strong>
                    सामान्य वर्ग को <strong>15%</strong> और महिलाओं तथा
                    विशेष वर्ग को <strong>25%</strong> तक सब्सिडी मिल सकती है।
                </li>

                <li>
                    <strong>आपका योगदान:</strong>
                    सामान्य वर्ग को प्रोजेक्ट कॉस्ट का लगभग
                    <strong>10%</strong> और विशेष वर्ग को लगभग
                    <strong>5%</strong> खुद लगाना होता है।
                </li>
            </ul>

            <hr>

            <h3>2️⃣ दस्तावेज़ तैयार रखें (Documents Ready)</h3>

            <p>
                आवेदन शुरू करने से पहले इन कागजातों की डिजिटल कॉपी
                तैयार रखें:
            </p>

            <ul>
                <li>
                    <strong>आधार कार्ड और पैन कार्ड</strong>
                </li>

                <li>
                    <strong>पासपोर्ट साइज फोटो</strong>
                </li>

                <li>
                    <strong>शैक्षणिक योग्यता प्रमाण पत्र</strong>
                    जैसे 8वीं की मार्कशीट, यदि लागू हो।
                </li>

                <li>
                    <strong>जाति/श्रेणी प्रमाण पत्र</strong>
                    यदि विशेष श्रेणी की सब्सिडी का लाभ लेना चाहते हैं।
                </li>

                <li>
                    <strong>विस्तृत प्रोजेक्ट रिपोर्ट (DPR)</strong>
                    जिसमें बिजनेस की जानकारी, मशीनरी की कोटेशन और
                    अनुमानित कमाई का विवरण हो।
                </li>

                <li>
                    <strong>ग्रामीण क्षेत्र का प्रमाण पत्र</strong>
                    यदि ग्रामीण क्षेत्र से आवेदन कर रहे हैं और
                    ग्रामीण सब्सिडी का लाभ लेना चाहते हैं।
                </li>
            </ul>

            <hr>

            <h3>3️⃣ आधिकारिक पोर्टल पर रजिस्ट्रेशन (Registration)</h3>

            <p>
                PMEGP के लिए आवेदन आधिकारिक PMEGP e-Portal या
                JanSamarth Portal के माध्यम से किया जा सकता है।
            </p>

            <p>
                <a
                    href="https://www.jansamarth.in/prime-minister-employment-generation-program-scheme"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    🔗 JanSamarth Portal खोलें
                </a>
            </p>

            <ol>
                <li>
                    PMEGP e-Portal पर जाएं।
                </li>

                <li>
                    <strong>Application for New Unit</strong>
                    यानी नए उद्योग के लिए आवेदन वाले विकल्प पर क्लिक करें।
                </li>

                <li>
                    अपना आधार नंबर दर्ज करके
                    <strong>Validate Aadhaar</strong> पर क्लिक करें।
                </li>

                <li>
                    <strong>Sponsoring Agency</strong> का चयन करें।
                    ग्रामीण क्षेत्र के लिए KVIC/KVIB और अपने जिले का
                    DIC विकल्प उपलब्ध हो सकता है।
                </li>
            </ol>

            <hr>

            <h3>4️⃣ मुख्य आवेदन फॉर्म भरना (Fill Application)</h3>

            <p>
                रजिस्ट्रेशन के बाद मुख्य आवेदन फॉर्म ध्यान से भरें:
            </p>

            <ul>
                <li>
                    <strong>व्यक्तिगत विवरण:</strong>
                    नाम, सामाजिक श्रेणी, शैक्षणिक योग्यता और पूरा पता।
                </li>

                <li>
                    <strong>बिजनेस की जानकारी:</strong>
                    शुरू किए जाने वाले उद्योग का नाम और स्थान।
                </li>

                <li>
                    <strong>प्रोजेक्ट की लागत:</strong>
                    मशीन, भवन और अन्य पूंजीगत खर्च तथा
                    वर्किंग कैपिटल का विवरण।
                </li>

                <li>
                    <strong>बैंक का चयन:</strong>
                    अपनी पसंद की बैंक शाखा चुनें, जैसे SBI या PNB।
                </li>

                <li>
                    फॉर्म भरने के बाद
                    <strong>Save Applicant Data</strong>
                    पर क्लिक करें।
                </li>

                <li>
                    इसके बाद रजिस्टर्ड मोबाइल पर Username और Password
                    प्राप्त हो सकता है।
                </li>
            </ul>

            <hr>

            <h3>5️⃣ दस्तावेज़ अपलोड और फाइनल सबमिट (Upload & Final Submit)</h3>

            <ol>
                <li>
                    प्राप्त Username और Password से पोर्टल पर दोबारा
                    लॉगिन करें।
                </li>

                <li>
                    <strong>Upload Documents</strong> टैब पर जाएं।
                </li>

                <li>
                    फोटो, आधार कार्ड, शैक्षणिक प्रमाण पत्र और
                    प्रोजेक्ट रिपोर्ट यानी DPR अपलोड करें।
                </li>

                <li>
                    पोर्टल पर दिए गए
                    <strong>Score Card</strong> के सवालों के जवाब दें
                    और उसे सेव करें।
                </li>

                <li>
                    सभी जानकारी सही होने पर
                    <strong>Final Submission</strong> बटन दबाएं।
                </li>
            </ol>

            <hr>

            <h3>🔎 आगे क्या होगा?</h3>

            <p>
                आपका आवेदन पहले चुनी गई सरकारी एजेंसी जैसे DIC या KVIC
                के पास जा सकता है। जांच के बाद आवेदन संबंधित बैंक को
                भेजा जा सकता है।
            </p>

            <p>
                बैंक से लोन स्वीकृत होने के बाद सब्सिडी की राशि
                सरकारी नियमों के अनुसार मार्जिन मनी के रूप में
                लॉक की जा सकती है और बाद में बिजनेस शुरू होने पर
                समायोजित हो सकती है।
            </p>

            <hr>

            <div class="call-section">
                <p>
                    📞 अधिक जानकारी के लिए हमारे एजेंट से कॉल करें
                </p>

                <a
                    href="tel:9507808055"
                    class="call-button"
                >
                    📞 एजेंट को कॉल करें
                </a>
            </div>

            <p class="small-note">
                ध्यान दें: सब्सिडी, पात्रता, लोन की सीमा और मंजूरी
                सरकारी नियमों, बैंक की जांच तथा आपकी योग्यता पर निर्भर
                करती है। आवेदन करने से पहले आधिकारिक पोर्टल या संबंधित
                जिला उद्योग केंद्र से जानकारी जरूर सत्यापित करें।
            </p>

        </div>
    `;
    }

    else if (schemeName === "women") {
        schemeInfo.innerHTML = `
            <h3>👩‍💼 महिला उद्यमी सहायता (For Bihar's women)</h3>

            <p>
                महिलाओं या ट्रांसजेंडरके लिए बैंक और सरकार की अलग-अलग व्यवसाय
                सहायता योजनाएँ हो सकती हैं।
            </p>

            <p><strong> 1️⃣ पात्रता की जरूरी शर्तें / Eligibility Criteria</strong></p>
            <p>
                

           <p>1. <strong>लिंग :</strong> आवेदक महिला या ट्रांसजेंडर होना चाहिए।</p>
           <p>2. <strong>उम्र :</strong> आवेदक की उम्र 18 से 50 वर्ष के बीच होनी चाहिए।</p>
           <p>3. <strong>पढ़ाई :</strong> आवेदक ने कम से कम 12वीं (इंटर), ITI, पॉलिटेक्निक डिप्लोमा या इसके बराबर की पढ़ाई पूरी की हो।</p>
           <p>4. <strong>निवास :</strong> आवेदक बिहार का स्थायी निवासी होना चाहिए।</p>

           <p><strong> 2️⃣ जरूरी कागजात तैयार रखें / Gather Your Core Documents</strong></p>

           <p>1. <strong>10वीं की मार्कशीट या प्रमाण पत्र :</strong> जन्मतिथि की जांच के लिए।</p>
           <p>2. <strong>12वीं या उसके बराबर की पढ़ाई का प्रमाण पत्र :</strong> पढ़ाई की जानकारी के लिए।</p>
           <p>3. <strong>आधार कार्ड :</strong> OTP के लिए आधार से आपका चालू मोबाइल नंबर जुड़ा होना चाहिए।</p>
           <p>4. <strong>स्थायी निवास प्रमाण पत्र :</strong> बिहार का निवासी होने का प्रमाण।</p>
           <p>5. <strong>जाति प्रमाण पत्र :</strong> अगर लागू हो।</p>
           <p>6. <strong>बैंक की जानकारी :</strong> बैंक पासबुक या कैंसिल चेक, जिसमें खाता नंबर और IFSC कोड साफ दिखाई दे।</p>

           <h5><strong>ध्यान दें:</strong> सभी कागजात की फोटो साफ होनी चाहिए, ताकि उनमें लिखी जानकारी आसानी से पढ़ी जा सके।</h5>

           <p><strong> 3️⃣ अपना खाता बनाएं / Create Your Account (Online Registration)</strong></p>

           <p>जब बिहार उद्योग विभाग आवेदन की तारीख जारी करके आवेदन शुरू करेगा, तब आप ऑनलाइन रजिस्ट्रेशन कर सकते हैं।</p>

           <p>1. <strong>आधिकारिक वेबसाइट खोलें :</strong>
           <a href="https://udyami.bihar.gov.in/" target="_blank">
              udyami.bihar.gov.in
           </a>
            </p>
           <p>2. <strong>"Registration" बटन पर क्लिक करें :</strong> रजिस्ट्रेशन शुरू करने के लिए।</p>

           <p>3. <strong>आधार नंबर और पासवर्ड भरें :</strong> अपना आधार नंबर डालें, एक सुरक्षित पासवर्ड बनाएं और OTP मंगाएं।</p>

           <p>4. <strong>OTP से सत्यापन करें :</strong> आधार से जुड़े मोबाइल नंबर पर आए OTP को डालकर सत्यापन पूरा करें।</p>

           <p>5. <strong>आवेदन की श्रेणी चुनें :</strong> "Mukhyamantri Mahila Udyami Yojana (MMUY)" को अपनी आवेदन श्रेणी के रूप में चुनें।</p>
           <div class="call-section">
                <p>📞 अधिक जानकारी के लिए हमारे एजेंट से कॉल करें</p>
                <a href="tel:9507808055" class="call-button">
                    📞 एजेंट को कॉल करें
                </a>
            </div>
        `;
    }

    schemeInfo.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}
function openAIChat() {
    const chatBox = document.getElementById("aiChatBox");

    if (chatBox) {
        chatBox.style.display = "block";
        chatBox.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

function closeAIChat() {
    const chatBox = document.getElementById("aiChatBox");

    if (chatBox) {
        chatBox.style.display = "none";
    }
}

function askQuickQuestion(question) {
    document.getElementById("userQuestion").value = question;
    sendAIMessage();
}

function sendAIMessage() {
    const input = document.getElementById("userQuestion");
    const messages = document.getElementById("chatMessages");
    const category = document.getElementById("businessCategory");
    const budget = document.getElementById("businessBudget");

    if (!input || !messages) {
        return;
    }

    const question = input.value.trim();
    const selectedBusiness = category ? category.value : "";
    const selectedBudget = budget ? budget.value : "";

    if (selectedBusiness === "") {
        alert("कृपया पहले अपना बिज़नेस चुनें।");
        return;
    }

    if (selectedBudget === "") {
        alert("कृपया पहले अपना बजट चुनें।");
        return;
    }

    if (question === "") {
        alert("कृपया अपना सवाल लिखें।");
        return;
    }

    const budgetNumber = Number(selectedBudget);

    messages.innerHTML += `
        <div class="user-message">
            <b>बिज़नेस:</b> ${selectedBusiness}<br>
            <b>बजट:</b> ₹${budgetNumber.toLocaleString("en-IN")}<br>
            <b>सवाल:</b> ${question}
        </div>
    `;

    input.value = "";

    messages.innerHTML += `
        <div id="typingMessage" class="bot-message">
            🤖 आपके बजट के अनुसार सलाह तैयार हो रही है...
        </div>
    `;

    messages.scrollTop = messages.scrollHeight;

    setTimeout(function () {
        const typingMessage = document.getElementById("typingMessage");

        const answer = getBusinessAdvice(question);

        let userData = JSON.parse(localStorage.getItem("udyamUser")) || {};

        const userName =
            userData.name ||
            userData.fullName ||
            userData.userName ||
            "Udyami Ji";

        const budgetPlan = createBudgetPlan(budgetNumber);

        const finalAnswer = `
            नमस्ते <b>${userName}</b> जी 🙏<br><br>

            <b>आपका बिज़नेस:</b> ${selectedBusiness}<br>
            <b>आपका बजट:</b> ₹${budgetNumber.toLocaleString("en-IN")}<br><br>

            ${answer}

            <br><br>
            <b>💰 आपके बजट की अनुमानित योजना:</b><br><br>
            ${budgetPlan}

            <br><br>
            <small>
                ⚠️ यह एक अनुमानित demo योजना है।
                वास्तविक खर्च आपके स्थान, दुकान और बिज़नेस के अनुसार बदल सकता है।
            </small>
        `;

        if (typingMessage) {
            typingMessage.innerHTML = finalAnswer;
            typingMessage.removeAttribute("id");
        }

        messages.scrollTop = messages.scrollHeight;
    }, 1000);
}
function createBudgetPlan(budget) {
    const stock = Math.round(budget * 0.60);
    const setup = Math.round(budget * 0.20);
    const marketing = Math.round(budget * 0.10);
    const emergency = budget - stock - setup - marketing;

    return `
        <div class="budget-plan-box">

            <div class="budget-plan-row">
                <span>📦 सामान / Stock</span>
                <b>₹${stock.toLocaleString("en-IN")}</b>
            </div>

            <div class="budget-plan-row">
                <span>🏪 दुकान / Setup</span>
                <b>₹${setup.toLocaleString("en-IN")}</b>
            </div>

            <div class="budget-plan-row">
                <span>📢 Marketing</span>
                <b>₹${marketing.toLocaleString("en-IN")}</b>
            </div>

            <div class="budget-plan-row">
                <span>🛡️ Emergency Fund</span>
                <b>₹${emergency.toLocaleString("en-IN")}</b>
            </div>

        </div>
    `;
}
function getBusinessAdvice(question) {
    const q = question.toLowerCase();

    const categoryElement = document.getElementById("businessCategory");

    const businessCategory = categoryElement
        ? categoryElement.value
        : "";

    if (
        businessCategory === "किराना दुकान" ||
        q.includes("किराना")
    ) {
        if (
            q.includes("ग्राहक") ||
            q.includes("बिक्री") ||
            q.includes("बढ़ाएं")
        ) {
            return `
                <b>किराना दुकान में ग्राहक बढ़ाने के तरीके:</b><br><br>
                1. रोजमर्रा का सामान हमेशा उपलब्ध रखें।<br>
                2. दुकान में साफ-सफाई रखें।<br>
                3. UPI Payment की सुविधा रखें।<br>
                4. आसपास के ग्राहकों को छोटी home delivery दें।<br>
                5. ग्राहकों के साथ अच्छा व्यवहार करें।<br>
                6. ज्यादा बिकने वाले सामान का स्टॉक रखें।
            `;
        }

        return `
            <b>किराना दुकान के लिए सलाह:</b><br><br>
            शुरुआत में आटा, चावल, दाल, तेल, नमक, साबुन,
            बिस्कुट और रोजमर्रा का सामान रखें।<br><br>
            पहले कम सामान से शुरुआत करें और रोज की बिक्री
            और खर्च का हिसाब जरूर लिखें।
        `;
    }

    if (
        businessCategory === "चाय और नाश्ता"
    ) {
        return `
            <b>चाय और नाश्ता बिज़नेस के लिए सलाह:</b><br><br>
            1. दुकान ऐसी जगह रखें जहाँ लोगों की आवाजाही हो।<br>
            2. चाय, समोसा, पकौड़ी और बिस्कुट जैसे सामान रखें।<br>
            3. साफ पानी और साफ बर्तन का इस्तेमाल करें।<br>
            4. सुबह और शाम के समय पर विशेष ध्यान दें।<br>
            5. ग्राहकों को तेज और अच्छा service दें।<br>
            6. रोज के दूध, चायपत्ती, गैस और सामान का खर्च लिखें।
        `;
    }

    if (
        businessCategory === "डेयरी बिज़नेस"
    ) {
        return `
            <b>डेयरी बिज़नेस के लिए सलाह:</b><br><br>
            1. अच्छे और स्वस्थ पशु चुनें।<br>
            2. पशुओं के लिए साफ पानी और संतुलित चारा रखें।<br>
            3. दूध की गुणवत्ता पर ध्यान दें।<br>
            4. आसपास के घरों, दुकानों और होटल से ग्राहक बनाएं।<br>
            5. पशुओं के टीकाकरण और स्वास्थ्य की देखभाल करें।<br>
            6. दूध की बिक्री और चारे का खर्च रोज लिखें।
        `;
    }

    if (
        businessCategory === "सिलाई सेंटर"
    ) {
        return `
            <b>सिलाई सेंटर के लिए सलाह:</b><br><br>
            1. ब्लाउज, सलवार, पैंट और स्कूल ड्रेस की सिलाई करें।<br>
            2. समय पर कपड़े तैयार करके दें।<br>
            3. अच्छे fitting और साफ finishing पर ध्यान दें।<br>
            4. त्योहार और शादी के समय special orders लें।<br>
            5. अपने काम के sample दिखाएं।<br>
            6. WhatsApp पर design और order की सुविधा दे सकते हैं।
        `;
    }

    if (
        businessCategory === "मोबाइल रिपेयर"
    ) {
        return `
            <b>मोबाइल रिपेयर बिज़नेस के लिए सलाह:</b><br><br>
            1. पहले basic repairing और software work सीखें।<br>
            2. charger, earphone, cover और tempered glass रखें।<br>
            3. ग्राहक को repair का सही खर्च पहले बताएं।<br>
            4. जरूरी tools और spare parts रखें।<br>
            5. काम की छोटी warranty दे सकते हैं।<br>
            6. ग्राहक का data सुरक्षित रखें।
        `;
    }

    if (
        businessCategory === "खेती से जुड़ा बिज़नेस"
    ) {
        return `
            <b>खेती से जुड़े बिज़नेस के लिए सलाह:</b><br><br>
            1. अपने क्षेत्र की फसल और मौसम को समझें।<br>
            2. बीज, खाद और कृषि उपकरण की जरूरत पहचानें।<br>
            3. किसानों से पहले demand पता करें।<br>
            4. सामान की quality पर ध्यान दें।<br>
            5. स्थानीय बाजार में कीमतों की तुलना करें।<br>
            6. शुरुआत छोटे स्तर से करें।
        `;
    }

    if (
        businessCategory === "मुर्गी पालन"
    ) {
        return `
            <b>मुर्गी पालन बिज़नेस के लिए सलाह:</b><br><br>
            1. साफ और हवादार शेड बनाएं।<br>
            2. अच्छी quality के चूजे लें।<br>
            3. दाना और साफ पानी समय पर दें।<br>
            4. बीमारी से बचाव के लिए vaccination कराएं।<br>
            5. अंडे या मुर्गे बेचने के लिए पहले ग्राहक खोजें।<br>
            6. दाना, दवा और बिक्री का हिसाब रखें।
        `;
    }

    if (
        businessCategory === "बकरी पालन"
    ) {
        return `
            <b>बकरी पालन बिज़नेस के लिए सलाह:</b><br><br>
            1. स्वस्थ बकरियां खरीदें।<br>
            2. साफ जगह और पर्याप्त चारा रखें।<br>
            3. समय पर vaccination और deworming कराएं।<br>
            4. स्थानीय बाजार में बकरियों की कीमत पता करें।<br>
            5. शुरुआत कम बकरियों से करें।<br>
            6. पशु चिकित्सक की सलाह लेते रहें।
        `;
    }

    if (
        q.includes("लोन") ||
        q.includes("loan") ||
        q.includes("ऋण")
    ) {
        return `
            <b>बिज़नेस लोन के लिए सामान्य सलाह:</b><br><br>
            1. आधार कार्ड और PAN कार्ड तैयार रखें।<br>
            2. बैंक खाता और बैंक स्टेटमेंट रखें।<br>
            3. अपने बिज़नेस का छोटा project plan बनाएं।<br>
            4. Udyam Registration की जानकारी लें।<br>
            5. मुद्रा योजना और PMEGP जैसी योजनाओं को देखें।<br><br>
            लोन लेने से पहले ब्याज, EMI और repayment की शर्तें जरूर समझें।
        `;
    }

    if (
        q.includes("मुनाफा") ||
        q.includes("कमाई") ||
        q.includes("profit")
    ) {
        return `
            <b>मुनाफा बढ़ाने के तरीके:</b><br><br>
            1. रोज की बिक्री और खर्च लिखें।<br>
            2. ज्यादा बिकने वाले सामान पर ध्यान दें।<br>
            3. बेकार stock कम रखें।<br>
            4. ग्राहकों से feedback लें।<br>
            5. छोटे offers और combo बनाएं।<br>
            6. खरीदारी से पहले अलग-अलग suppliers की कीमत देखें।
        `;
    }

    return `
        <b>${businessCategory} के लिए सामान्य सलाह:</b><br><br>
        अपने बिज़नेस की शुरुआत छोटे स्तर से करें।<br>
        पहले ग्राहकों की जरूरत और स्थानीय बाजार को समझें।<br>
        रोज की बिक्री, खर्च और मुनाफे का हिसाब रखें।<br><br>
        आप ग्राहक, बिक्री, बजट, लोन या मुनाफे से जुड़ा सवाल पूछ सकते हैं।
    `;
}