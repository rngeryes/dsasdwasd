// Инициализация TON Connect
const { TonConnect } = window.TonConnect;
const tonConnect = new TonConnect();

// Кнопка "Connect TON Wallet"
document.getElementById("connectWallet").onclick = async () => {
  try {
    // Открытие TON Connect на телефоне или в браузере
    await tonConnect.connect();

    // Если подключение успешно, получаем адрес кошелька
    const walletInfo = tonConnect.wallet;
    const walletAddress = walletInfo.account.address;

    document.getElementById("walletAddress").innerText = `Wallet: ${walletAddress}`;
    document.getElementById("status").innerText = "Status: Wallet connected!";
  } catch (error) {
    console.error("Error connecting wallet:", error);
    alert("Failed to connect wallet. Make sure you have a TON wallet installed.");
  }
};

// Проверка баланса TON
document.getElementById("checkBalance").onclick = async () => {
  if (!tonConnect.wallet) {
    alert("Please connect your TON wallet first.");
    return;
  }

  try {
    const walletAddress = tonConnect.wallet.account.address;

    // Получение баланса через Toncenter
    const response = await fetch(
      `https://toncenter.com/api/v2/getAddressInformation?address=${walletAddress}`
    );
    const data = await response.json();

    const balance = parseFloat(data.result.balance) / 1e9; // Конвертация из наноTON в TON
    document.getElementById("balance").innerText = `Balance: ${balance.toFixed(2)} TON`;
  } catch (error) {
    console.error("Error fetching balance:", error);
    alert("Failed to check balance.");
  }
};
