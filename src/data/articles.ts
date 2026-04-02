import { categories } from "./categories";

export interface ArticleStep {
  title: string;
  description: string;
}

export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface Article {
  slug: string;
  title: string;
  category: string;
  description: string;
  publishDate: string;
  steps: ArticleStep[];
  faqs: ArticleFAQ[];
  relatedSlugs: string[];
  youtubeSearch: string;
}

const generateRealisticContent = (device: string, issue: string): { steps: ArticleStep[], faqs: ArticleFAQ[] } => {
  const isPower = issue.includes("turn") || issue.includes("charg") || issue.includes("battery");
  const isNetwork = issue.includes("wifi") || issue.includes("internet") || issue.includes("bluetooth") || issue.includes("hotspot");
  const isStorage = issue.includes("storage") || issue.includes("full") || issue.includes("space");
  const isDisplay = issue.includes("screen") || issue.includes("flicker") || issue.includes("display") || issue.includes("black");
  const isPerf = issue.includes("slow") || issue.includes("overheat") || issue.includes("hang") || issue.includes("freez");

  let steps: ArticleStep[] = [];

  if (isPower) {
    steps = [
      { title: "Perform a Hard Reset", description: `Before assuming hardware failure, force a hard reset. On most ${device}s, hold the power button (and sometimes volume down simultaneously) for 15–20 seconds. This clears residual charge and forces the motherboard to restart the boot sequence from scratch.` },
      { title: "Inspect Ports and Connections", description: "Use a flashlight to carefully examine the charging port. Look for lint, dust, or bent pins. Gently clear any debris using a non-conductive tool like a wooden toothpick. A blocked port prevents full electrical contact and is one of the most common causes of charging failures." },
      { title: "Test with Alternative Accessories", description: "Rule out faulty cables or adapters. Try a certified charger and cable from another device. Sometimes the power brick fails while the cable works fine. Plug directly into a wall outlet rather than a power strip to ensure full voltage delivery." },
      { title: "Boot into Safe Mode or Recovery", description: `If the ${device} shows faint signs of life — like a charging LED or vibration — but won't boot normally, try accessing recovery mode. This bypasses the main OS load. From here you can clear the cache partition or perform a factory reset.` },
      { title: "Check Battery Health", description: "If the device powers on briefly then shuts down, the battery may have chemically degraded. Check battery health in settings if available. A bulging casing or immediate excessive heat upon charging are danger signs — disconnect immediately and seek professional repair." },
      { title: "Contact Professional Repair", description: "If all software and basic hardware steps fail, the issue is likely a hardware fault — a failed charging IC, motherboard component, or dead battery cell. Bring the device to a certified repair center. Attempting internal repairs without the right tools can cause further damage." }
    ];
  } else if (isNetwork) {
    steps = [
      { title: "Toggle Airplane Mode", description: "The quickest way to reset the radio stack is to turn Airplane Mode on for 30 seconds then off. On a PC, right-click the network icon, disable the adapter, wait 10 seconds, then re-enable it. This forces the device to drop its IP lease and renegotiate a fresh connection." },
      { title: "Forget and Reconnect to the Network", description: "Corrupted saved network profiles cause authentication loops. Go to Settings, find the problematic network, tap 'Forget this network'. Restart your device, then reconnect by entering the password again from scratch. This rebuilds the connection profile cleanly." },
      { title: "Restart Your Modem and Router", description: "Power cycle your networking equipment completely. Unplug both devices from the wall, wait a full 60 seconds, then plug the modem in first. Wait for all its lights to stabilize (usually 2 minutes), then plug in the router. This clears the router's memory and reselects less congested wireless channels." },
      { title: "Reset Network Settings", description: `If localized fixes fail, reset the entire network stack on your ${device}. Look for 'Reset Network Settings' in system settings. Warning: this erases all saved Wi-Fi passwords and Bluetooth pairings, returning radio configurations to factory defaults.` },
      { title: "Update Firmware and Drivers", description: "Outdated network drivers frequently cause compatibility issues with modern routers. Check for system updates. On PC, open Device Manager, find your network adapter under 'Network adapters', right-click and select 'Update driver'. Download updates from the manufacturer's official website." },
      { title: "Contact Your ISP", description: "If the problem persists across multiple devices, the fault may be with your Internet Service Provider. Run a speed test to document the issue, then call your ISP with the results. Ask them to check for line noise, IP conflicts, or outages in your area." }
    ];
  } else if (isStorage) {
    steps = [
      { title: "Check Current Storage Usage", description: "Go to Settings > Storage (or About Phone > Storage). See exactly which categories — apps, photos, videos, other files — are consuming the most space. This tells you precisely where to focus your cleanup efforts rather than guessing." },
      { title: "Delete Unused Apps and Games", description: "Sort your apps by size. Large games and apps you haven't opened in months are the easiest wins. Uninstall them completely — don't just disable them — to free up all their associated cache and data files as well." },
      { title: "Clear App Caches", description: "Go to Settings > Apps. For each major app (especially social media, maps, and browsers), tap Storage > Clear Cache. Cached data is safe to delete — the app rebuilds it automatically. This alone can free several gigabytes on a heavily-used device." },
      { title: "Move Photos and Videos to Cloud", description: "Enable Google Photos, iCloud, or OneDrive automatic backup. Once photos are safely backed up, delete the local copies. Videos especially consume enormous space — a single 4K video can be gigabytes. Cloud storage is the most sustainable long-term solution." },
      { title: "Use Manufacturer Storage Tools", description: "Most modern phones have built-in storage analysis tools (Files by Google, iPhone Storage Recommendations). These identify large files, duplicate photos, downloaded files, and redundant backups that are safe to remove. Follow their guided cleanup suggestions." },
      { title: "Consider External or Expanded Storage", description: "If your device supports microSD cards, add one and move media files to it. For iPhones, upgrade your iCloud plan. For computers, an external SSD is an affordable permanent solution. Prevention is key — set up auto-cleanup routines to avoid hitting storage limits again." }
    ];
  } else if (isDisplay) {
    steps = [
      { title: "Force Restart the Device", description: "Display glitches — including flickering, black screens, and frozen displays — are often caused by temporary software hangs. Perform a hard restart by holding the power button for 15 seconds. This is safe and resolves a surprisingly large number of display issues instantly." },
      { title: "Adjust Display Settings", description: "Navigate to Settings > Display. Disable 'Adaptive Brightness' or 'Auto-brightness' temporarily. Set brightness to a fixed level. Also try changing the screen refresh rate if your device supports 60/90/120Hz options, as incompatible settings can cause flickering." },
      { title: "Check for Software Updates", description: "Display bugs are often fixed in OS patches. Go to Settings > Software Update and install any pending updates. If a recent update caused the issue, check online forums to see if others report the same bug — a follow-up patch is usually released within days." },
      { title: "Boot into Safe Mode", description: "Restart in Safe Mode (hold power, then long-press 'Power Off'). If the screen works normally in Safe Mode, a third-party app is the culprit. Uninstall recently installed apps one by one, restarting between each, until you identify the problematic app." },
      { title: "Inspect Physical Hardware", description: "Check the display cable connection. On laptops, try gently pressing around the hinges — a loose display cable often causes intermittent flickering when the lid moves. Also check for physical damage: even minor impacts can cause internal display connector issues." },
      { title: "Replace the Display Component", description: "If the issue persists after all software steps, the display panel itself, its ribbon cable, or the graphics driver chip may be failing. This requires professional hardware diagnosis. Get a quote from a certified repair center — screen replacements are typically cost-effective." }
    ];
  } else if (isPerf) {
    steps = [
      { title: "Close Background Apps", description: "Open the app switcher and close all running apps. Background apps consume RAM and CPU cycles even when you're not using them. On Windows, open Task Manager (Ctrl+Shift+Esc) and end high-resource processes from the Processes tab." },
      { title: "Check Storage Space", description: "Systems become severely unstable when storage drops below 10%. Free at least 15% of your total storage. Delete large unused files, empty the Recycle Bin/Trash, and uninstall apps you no longer use. Low storage forces the OS to use disk as RAM, which is dramatically slower." },
      { title: "Manage Startup Programs", description: "Many apps add themselves to startup, slowing boot time and consuming resources constantly. On Windows, open Task Manager > Startup tab. On Android/iPhone, review Battery > Background App Refresh settings. Disable everything that doesn't need to run immediately on startup." },
      { title: "Check for Malware or Adware", description: "On Windows, run Windows Defender or Malwarebytes (free). Malware can silently consume 100% CPU and RAM in the background. On mobile, check for unusual battery drain and data usage — these are key indicators of malicious background processes." },
      { title: "Update System and Drivers", description: "Outdated drivers — especially graphics and chipset drivers — cause significant performance degradation. On Windows, check Windows Update and Device Manager. Outdated OS versions on mobile miss important memory management optimizations introduced in newer builds." },
      { title: "Factory Reset or Clean Install", description: "After years of use, accumulated system clutter, broken registry entries (Windows), and corrupted system files cause permanent slowdowns. A clean OS install is the most effective fix. Back up your data first, then perform a factory reset or fresh OS install for like-new performance." }
    ];
  } else {
    steps = [
      { title: "Force Restart the Application or Device", description: `When facing this issue, the first step is to kill active processes. Force close the misbehaving application. If the whole system is unresponsive, perform a hard reboot on the ${device} to flush RAM and terminate stuck background services.` },
      { title: "Clear Application Cache and Data", description: "Corrupted temporary files are the leading cause of software instability. Navigate to Settings > Apps > [App Name] > Storage and clear the cache. If the issue persists, clear app data entirely (note: this resets the app to its initial state and signs you out)." },
      { title: "Check for Available Updates", description: "Software bugs are frequently patched by manufacturers. Go to your system settings and check for OS updates. If a specific app is misbehaving, check its app store page for a newer version that addresses known issues." },
      { title: "Uninstall and Reinstall the App", description: "A fresh installation resolves corrupted app files that clearing cache cannot fix. Uninstall the application completely, restart your device, then reinstall from the official source. Do not use APK mirrors or unofficial sources — they may reinstall the corrupted version." },
      { title: "Run Built-in Diagnostics", description: `Utilize built-in diagnostic features. On Windows, run SFC /scannow in an elevated Command Prompt. On ${device}, try booting into Safe Mode to isolate whether a third-party app is causing the conflict. Safe mode disables all downloaded apps temporarily.` },
      { title: "Factory Reset as Last Resort", description: "If the software remains broken after all steps, back up your important data and perform a full system restore. This wipes the device clean and installs a fresh OS copy, resolving deep-rooted software corruption that individual fixes cannot address." }
    ];
  }

  const faqs: ArticleFAQ[] = [
    {
      question: `Will these fixes void my ${device} warranty?`,
      answer: "No. Basic software troubleshooting, forced restarts, and safe exterior cleaning do not void warranties. Physically opening the device chassis would. Always check your warranty terms before any physical repair."
    },
    {
      question: `How much does professional repair cost for this issue?`,
      answer: "Basic diagnostic fees range from $50–$80. Component replacements (battery, screen, charging port) typically run $80–$200. Motherboard-level repairs can be $200–$400+. Always get quotes from multiple certified repair centers."
    },
    {
      question: "Is my data safe while performing these steps?",
      answer: "Most steps (clearing cache, restarting, updating) are completely data-safe. Steps like 'Reset Network Settings' erase Wi-Fi passwords but not personal data. A factory reset erases everything — always back up first. We clearly mark any step that affects your data."
    },
    {
      question: "How long will these fixes take?",
      answer: "Most steps take 2–10 minutes each. Work through them in order — the majority of issues are resolved by Step 1 or 2. If you reach the final step without resolution, professional diagnosis is the next logical move."
    }
  ];

  return { steps, faqs };
};

const allSlugs = [
  // Laptop
  "laptop-turns-on-then-off", "laptop-overheating-fix", "laptop-battery-draining-fast",
  "screen-flickering-laptop", "keyboard-not-working-laptop", "touchpad-not-working",
  "usb-device-not-recognized", "external-hard-drive-not-detected", "ssd-not-showing-in-windows",
  "macbook-not-turning-on", "macbook-overheating", "macbook-battery-drain-fix",
  "laptop-fan-making-noise", "laptop-running-slow-fix", "laptop-wont-connect-to-wifi",
  "laptop-screen-black-on-startup", "laptop-keyboard-typing-wrong-characters", "laptop-stuck-on-loading-screen",
  // Windows
  "windows-update-stuck", "windows-black-screen-after-login", "windows-slow-performance-fix",
  "windows-stuck-on-restart", "windows-blue-screen-fix", "windows-error-0x80070005",
  "mouse-not-working-windows", "speaker-not-working-windows", "microphone-not-working-windows",
  "bluetooth-not-working-windows", "printer-not-connecting-wifi", "printer-offline-fix",
  "chrome-not-opening-fix", "chrome-keeps-crashing", "windows-10-freezing-fix",
  "windows-11-start-menu-not-working", "taskbar-not-responding-windows", "windows-explorer-keeps-crashing",
  // Internet
  "wifi-connected-but-no-internet", "router-not-working-fix", "youtube-not-loading-fix",
  "slow-internet-speed-fix", "dns-server-not-responding", "vpn-not-connecting-fix",
  "wifi-keeps-disconnecting", "no-internet-after-windows-update", "ethernet-not-working-windows",
  // Android
  "android-app-keeps-crashing", "android-fast-charging-not-working", "android-phone-not-turning-on",
  "hotspot-not-working-android", "bluetooth-not-working-android", "phone-screen-not-responding",
  "phone-restarting-randomly", "phone-storage-full-android", "android-system-ui-not-responding",
  "google-play-store-not-working", "android-phone-overheating", "android-wifi-not-working",
  "android-battery-draining-fast", "android-touchscreen-not-working", "android-bluetooth-headphones-not-connecting",
  // iPhone
  "iphone-storage-full-solution", "iphone-not-charging-fix", "iphone-overheating-fix",
  "iphone-wifi-not-working", "iphone-face-id-not-working", "iphone-camera-not-working",
  "iphone-sound-not-working", "iphone-screen-freezing", "iphone-touch-not-working",
  "iphone-bluetooth-not-working", "iphone-mobile-data-not-working", "iphone-not-turning-on",
  "iphone-stuck-on-apple-logo", "iphone-apps-crashing", "iphone-battery-draining-fast",
  // Phone (general)
  "app-store-not-downloading-apps", "phone-not-connecting-to-pc", "phone-call-quality-poor",
  "phone-sim-card-not-detected", "phone-gps-not-working", "phone-speaker-not-working",
];

const getCategoryForSlug = (slug: string) => {
  if (slug.includes("windows") || slug.includes("usb") || slug.includes("ssd") || slug.includes("mouse") || slug.includes("speaker") || slug.includes("microphone") || slug.includes("printer") || slug.includes("chrome") || slug.includes("taskbar") || slug.includes("explorer") || slug.includes("start-menu")) return "windows-issues";
  if (slug.includes("iphone") || slug.includes("macbook") || slug.includes("app-store")) return "iphone-issues";
  if (slug.includes("android") || slug.includes("play-store")) return "android-issues";
  if (slug.includes("wifi") || slug.includes("router") || slug.includes("internet") || slug.includes("youtube") || slug.includes("slow-internet") || slug.includes("dns") || slug.includes("vpn") || slug.includes("ethernet") || slug.includes("no-internet")) return "internet-issues";
  if (slug.includes("laptop") || slug.includes("keyboard") || slug.includes("touchpad") || slug.includes("macbook") || slug.includes("external-hard") || slug.includes("ssd")) return "laptop-issues";
  return "phone-issues";
};

const getYoutubeSearch = (slug: string, title: string): string => {
  const query = encodeURIComponent(`how to fix ${title.replace("How to Fix: ", "").replace("How to Fix ", "")} tutorial`);
  return `https://www.youtube.com/results?search_query=${query}`;
};

export const articles: Article[] = allSlugs.map((slug, index) => {
  const rawTitle = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const categorySlug = getCategoryForSlug(slug);
  const deviceName = categorySlug.split("-")[0];
  const content = generateRealisticContent(deviceName, rawTitle.toLowerCase());
  const related = [...allSlugs]
    .filter(s => s !== slug && getCategoryForSlug(s) === categorySlug)
    .slice(0, 3);
  const title = `How to Fix: ${rawTitle}`;

  return {
    slug,
    title,
    category: categorySlug,
    description: `Complete step-by-step guide to fix ${rawTitle.toLowerCase()}. Proven troubleshooting methods that actually work — get your device back up and running in minutes.`,
    publishDate: new Date(Date.now() - index * 86400000 * 2).toISOString(),
    steps: content.steps,
    faqs: content.faqs,
    relatedSlugs: related,
    youtubeSearch: getYoutubeSearch(slug, title),
  };
});
