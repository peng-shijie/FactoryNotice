// 刷新页面每天24点
function refreshAtMidnight() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const msUntilMidnight = midnight - now;
    setTimeout(() => location.reload(), msUntilMidnight);
}
refreshAtMidnight();



    // 从后端加载内容
    function loadNotice() {
      axios.get('/api/get-notice')
        .then(response => {
          document.getElementById('notice-content').innerHTML = response.data.content.replace(/\n/g, '<br>'); // 显示换行符
        })
        .catch(error => {
          document.getElementById('notice-content').innerHTML = '<p>加载失败，请稍后再试。</p>';
          console.error(error);
        });
    }

    // 初始化加载内容
    loadNotice();

  document.addEventListener("DOMContentLoaded", () => {
    const monthNames = [
      "一月份", "二月份", "三月份", "四月份", "五月份", "六月份",
      "七月份", "八月份", "九月份", "十月份", "十一月份", "十二月份"
    ];
    const currentMonth = new Date().getMonth(); // 获取当前月份（0-11）
    const birthdayMonthSpan = document.getElementById("birthday-month");
    
    if (birthdayMonthSpan) {
      birthdayMonthSpan.textContent = `员工生日祝福（${monthNames[currentMonth]}）`;
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    // 定义季度名称
    const seasonNames = [
      "季度", // 1 月 - 3 月
      "季度", // 4 月 - 6 月
      "季度", // 7 月 - 9 月
      "季度"  // 10 月 - 12 月
    ];

    // 获取当前月份（0 - 11）
    const currentMonth = new Date().getMonth();
    const currentSeason = Math.floor(currentMonth / 3); // 计算季度索引

    // 获取目标元素并更新内容
    const rewardSeasonSpan = document.getElementById("reward-season");
    if (rewardSeasonSpan) {
      rewardSeasonSpan.textContent = `${seasonNames[currentSeason]}表彰奖励员工名单`;
    }
  });

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("birthday-names"); // 容器
    const pageSize = 30; // 每页显示的人名数量
    let currentPage = 0;
    let data = []; // 人名数据

    // 获取数据并初始化
    fetch("/api/birthday-names")
        .then(response => response.json())
        .then(responseData => {
            data = responseData; // 将数据存储到变量
            renderPage(); // 渲染第一页

            // 自动翻页：每5秒切换一次
            setInterval(() => {
                currentPage++;
                if ((currentPage * pageSize) >= data.length) {
                    currentPage = 0; // 如果到最后一页，回到第一页
                }
                renderPage();
            }, 5000); // 翻页间隔时间（单位：毫秒）
        })
        .catch(error => console.error("Error fetching birthday names:", error));

    // 渲染当前页
    function renderPage() {
        container.innerHTML = ""; // 清空容器
        const start = currentPage * pageSize;
        const end = start + pageSize;
        const pageData = data.slice(start, end); // 获取当前页的数据

        const today = new Date();
        const todayMonthDay = `${today.getMonth() + 1}-${today.getDate()}`;

        pageData.forEach(person => {
            const col = document.createElement("div");
            col.className = "col";
            col.textContent = person.name; // 显示人名

        if (person.birthday) {
            const birthDate = new Date(person.birthday);
            const birthMonthDay = `${birthDate.getMonth() + 1}-${birthDate.getDate()}`;
            if (birthMonthDay === todayMonthDay) {
                col.style.textDecoration = "underline"; // 添加下划线text-underline-offset: 4px
                col.style.textUnderlineOffset = "4px";
            }
        }


            container.appendChild(col);
        });

        // 触发 CSS 动画
        container.style.animation = "none"; // 清除之前的动画
        setTimeout(() => {
            container.style.animation = ""; // 重新触发动画
        }, 10); // 确保动画被重新触发
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "/api/employee-rewards"; // 后端 API 地址
    const tableBody = document.getElementById("rewardTableBody"); // 获取表格主体元素

    // 从后端获取数据
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // 清空表格内容
            tableBody.innerHTML = "";

            // 如果数据不足20条，补充空行到20条
            while (data.length < 18) {
                data.push({ id: "", name: "", project: "", reward: "" }); // 补充空数据
            }

            // 将数据分组为每组两条
            const groupedData = [];
            for (let i = 0; i < data.length; i += 2) {
                groupedData.push(data.slice(i, i + 2));
            }

            // 渲染表格
            groupedData.forEach((group) => {
                const row = document.createElement("tr");
                group.forEach((employee) => {
                    row.innerHTML += `
                        <td class="text-center">${employee.id || ""}</td>
                        <td class="text-center fw-medium">${employee.name || ""}</td>
                        <td class="text-center">${employee.project || ""}</td>
                        <td class="text-center fw-semibold">${employee.reward || ""}</td>
                    `;
                });

                // 如果这一组只有一条记录，补充空单元格
                if (group.length < 2) {
                    row.innerHTML += `
                        <td class="text-center"></td>
                        <td class="text-center fw-medium"></td>
                        <td class="text-center"></td>
                        <td class="text-center fw-semibold"></td>
                    `;
                }

                tableBody.appendChild(row);
            });

            // 设置自动滚动
            if (data.length > 18) {
                const table = document.querySelector(".reward-table");
                const scrollStep = 1; // 每次滚动的步长
                const scrollInterval = 50; // 每次滚动的时间间隔（毫秒）
                let scrollPosition = 0;

                const scrollTable = () => {
                    scrollPosition += scrollStep;
                    table.scrollTop = scrollPosition;

                    // 当滚动到表格底部时，重置滚动位置
                    if (scrollPosition >= table.scrollHeight - table.clientHeight) {
                        scrollPosition = 0;
                    }
                };

                setInterval(scrollTable, scrollInterval);
            }
        })
        .catch((error) => {
            console.error("数据加载失败:", error);
            tableBody.innerHTML = "<tr><td colspan='8'>数据加载失败，请稍后再试。</td></tr>";
        });
});

document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "/api/performance-stats"; // 后端 API 地址
    const tableBody = document.getElementById("performanceTableBody"); // 获取表格主体元素

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // 清空表格内容
            tableBody.innerHTML = "";

            let total = 0; // 合计次数

            // 计算总次数
            data.forEach(row => {
                total += Number(row.count) || 0;
            });

            // 如果数据不足10条，补充空数据到10条
            while (data.length < 10) {
                data.push({
                    department: "",
                    count: "",
                    leader: "",
                    vice_leader: ""
                });
            }

            // 渲染表格内容
            data.forEach((row, i) => {
                const tableRow = document.createElement("tr");
                tableRow.innerHTML = `
                    <td class="text-center">${i + 1}</td>
                    <td class="text-center fw-medium">${row.department || ""}</td>
                    <td class="text-center fw-semibold">${row.count || ""}</td>
                    <td class="text-center">${row.leader || ""}</td>
                    <td class="text-center">${row.vice_leader || ""}</td>
                `;
                tableBody.appendChild(tableRow);
            });

            // 添加合计行
            const totalRow = document.createElement("tr");
            totalRow.style.background = "rgba(253,224,71,0.21)";
            totalRow.classList.add("summary-row");
            totalRow.innerHTML = `
                <td class="text-center fw-bold" colspan="2">合计</td>
                <td class="text-center fw-bold">${total}</td>
                <td class="text-center" colspan="2"></td>
            `;
            tableBody.appendChild(totalRow);

            // 设置自动滚动
            if (data.length > 8) {
                const tableDiv = document.querySelector(".performance-table");
                const scrollStep = 1; // 每次滚动的步长
                const scrollInterval = 50; // 滚动时间间隔（毫秒）
                let scrollPosition = 0;

                const scrollTable = () => {
                    scrollPosition += scrollStep;
                    tableDiv.scrollTop = scrollPosition;

                    // 当滚动到底部时，重置滚动位置
                    if (scrollPosition >= tableDiv.scrollHeight - tableDiv.clientHeight) {
                        scrollPosition = 0;
                    }
                };

                setInterval(scrollTable, scrollInterval);
            }
        })
        .catch(() => {
            tableBody.innerHTML = "<tr><td colspan='5'>数据加载失败，请稍后再试。</td></tr>";
        });
});
