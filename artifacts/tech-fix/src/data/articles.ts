import { categories } from "./categories";

export interface ArticleStep {
  title: string;
  description: string;
}

export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface ArticleTranslation {
  title: string;
  description: string;
  intro: string;
  keywords: string;
}

export interface Article {
  slug: string;
  title: string;
  category: string;
  type?: "power" | "network" | "storage" | "display" | "perf" | "general";
  description: string;
  intro: string;
  keywords: string;
  publishDate: string;
  steps: ArticleStep[];
  faqs: ArticleFAQ[];
  relatedSlugs: string[];
  youtubeSearch: string;
  translations?: {
    ar?: ArticleTranslation;
    es?: ArticleTranslation;
  };
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

const articleSpecificData: Record<string, { title: string; description: string; keywords: string; intro: string }> = {
  "laptop-turns-on-then-off": {
    title: "Laptop Turns On Then Shuts Off Immediately — 6 Fixes",
    description: "Laptop powers on then shuts down seconds later? This is usually overheating protection, bad RAM, or a power fault. Our 6-step fix covers every cause with exact instructions.",
    keywords: "laptop turns on then shuts off, laptop powers on then off, laptop won't stay on, laptop keeps shutting down, laptop instant shutdown fix",
    intro: "When a laptop powers on but immediately shuts off — sometimes within seconds — it's almost always one of three things: thermal protection kicking in due to a clogged heat sink, a failing power supply unable to sustain the load, or RAM that isn't seated correctly. This guide walks through each cause in order of likelihood so you can fix it without any guesswork.",
  },
  "laptop-overheating-fix": {
    title: "Laptop Overheating Fix — Stop Shutdowns and Throttling",
    description: "Laptop fan running at full speed and device burning hot? Overheating causes shutdowns and CPU throttling. Learn to clean vents, reapply thermal paste, and set cooling profiles.",
    keywords: "laptop overheating fix, laptop too hot, laptop fan loud, laptop thermal throttling, how to cool down laptop, laptop heat fix",
    intro: "A laptop that runs dangerously hot is one of the most common and most damaging tech problems. Sustained high temperatures degrade your CPU, GPU, and battery over time. The good news: 90% of laptop overheating issues come from dust-blocked vents and dried-out thermal paste — both fixable at home with zero tools or just a can of compressed air.",
  },
  "laptop-battery-draining-fast": {
    title: "Laptop Battery Draining Fast — How to Double Your Battery Life",
    description: "Laptop battery dying in 1-2 hours? Background processes, display brightness, and power plan settings are the main culprits. These steps can double your battery runtime.",
    keywords: "laptop battery draining fast, laptop battery life bad, laptop dies quickly, improve laptop battery, laptop battery fix, Windows battery drain",
    intro: "A laptop battery that used to last 8 hours now barely makes it through 2 hours — this is frustrating but usually fixable. Before assuming you need a new battery, background apps, high display brightness, and misconfigured power plans are responsible for the majority of excessive battery drain. Walk through these steps before spending money on a replacement.",
  },
  "screen-flickering-laptop": {
    title: "Laptop Screen Flickering Fix — Stop Screen Flashing for Good",
    description: "Laptop screen flickering or flashing? Outdated GPU drivers, a loose display cable, or incorrect refresh rate settings cause this. Here's the exact fix for each cause.",
    keywords: "laptop screen flickering, laptop screen flashing, laptop display flickering fix, screen flicker Windows, laptop screen strobing, display flickering fix",
    intro: "A flickering laptop screen is one of the most distracting problems you can experience. The first thing to determine is whether the flickering happens in Task Manager as well — if it does, it's a driver or OS issue. If only the desktop flickers but Task Manager doesn't, an incompatible third-party app is the culprit. This distinction alone narrows the fix down immediately.",
  },
  "keyboard-not-working-laptop": {
    title: "Laptop Keyboard Not Working — Complete Troubleshooting Guide",
    description: "Laptop keyboard stopped working or some keys don't respond? A driver crash, disabled keyboard, or Windows Update conflict are the most common causes. Fix it here.",
    keywords: "laptop keyboard not working, laptop keyboard stopped working, some keys not working laptop, keyboard fix Windows, keyboard driver fix, laptop keyboard disabled",
    intro: "A laptop keyboard that stops working — whether completely dead or just certain keys — is almost never a hardware problem. In the vast majority of cases, a Windows Update rolled back a keyboard driver, a keyboard shortcut accidentally disabled it, or a Filter Keys setting is swallowing keystrokes. Follow these steps before assuming you need a replacement.",
  },
  "touchpad-not-working": {
    title: "Laptop Touchpad Not Working — Re-enable and Fix It",
    description: "Touchpad not responding on your laptop? It may be disabled by a function key, a driver crash, or a Windows update conflict. Follow these 6 steps to re-enable it.",
    keywords: "touchpad not working, laptop trackpad not working, touchpad disabled fix, touchpad not responding, how to enable touchpad, touchpad driver fix",
    intro: "A suddenly unresponsive touchpad is one of the most common post-Windows-Update issues. Before anything else, check whether a function key combination (usually Fn + F5, F7, or F9 depending on your laptop brand) has accidentally disabled it — this is responsible for roughly 40% of 'broken touchpad' reports. If that doesn't work, the driver needs attention.",
  },
  "usb-device-not-recognized": {
    title: "USB Device Not Recognized — Fix Windows USB Errors",
    description: "Windows shows 'USB device not recognized'? Fix driver issues, USB selective suspend settings, and hub power management to get any USB device working again.",
    keywords: "USB device not recognized, USB not working Windows, USB error fix, Windows USB driver fix, USB device unknown, USB not detected Windows 10 11",
    intro: "The 'USB Device Not Recognized' error in Windows is deceptively common and surprisingly easy to fix once you know where to look. The problem is almost never the USB device itself — it's Windows' power management aggressively cutting power to USB ports or a corrupted USB driver entry that needs refreshing. This guide isolates the exact cause.",
  },
  "external-hard-drive-not-detected": {
    title: "External Hard Drive Not Showing Up — How to Fix It",
    description: "External hard drive not detected by Windows? It may need a drive letter assigned, driver refresh, or disk initialization. These 6 steps cover all scenarios.",
    keywords: "external hard drive not showing up, external hard drive not detected, hard drive not recognized Windows, USB hard drive not working, fix external hard drive",
    intro: "An external hard drive that doesn't show up in File Explorer is alarming but rarely means the data is lost. Windows often detects the drive internally but simply fails to assign it a drive letter — making it invisible in Explorer. Disk Management reveals drives that Explorer hides, and in most cases a right-click assign letter is the entire fix.",
  },
  "ssd-not-showing-in-windows": {
    title: "SSD Not Showing in Windows — Initialization and Detection Fix",
    description: "New or installed SSD not appearing in Windows? It needs initialization or a drive letter assigned. BIOS detection issues are also covered in this complete guide.",
    keywords: "SSD not showing in Windows, SSD not detected, new SSD not appearing, SSD not visible Windows 10 11, M.2 SSD not showing, initialize SSD fix",
    intro: "A brand new SSD won't show up in File Explorer — but that doesn't mean it isn't there. Windows requires SSDs to be initialized before they appear. Meanwhile, an existing SSD that suddenly disappears is usually a BIOS detection issue or a missing drive letter. This guide covers both scenarios with exact steps for Windows 10 and 11.",
  },
  "macbook-not-turning-on": {
    title: "MacBook Won't Turn On — SMC Reset and Recovery Steps",
    description: "MacBook won't power on? Before assuming hardware failure, try SMC reset, NVRAM reset, safe mode boot, and Apple Diagnostics. All steps covered here.",
    keywords: "MacBook won't turn on, MacBook not powering on, MacBook dead, MacBook SMC reset, MacBook not starting, MacBook black screen fix",
    intro: "A MacBook that refuses to power on can mean anything from a drained battery with a faulty charging indicator to a corrupted SMC configuration. Apple's System Management Controller (SMC) handles power behaviour, and a corrupted SMC is the single most common cause of MacBooks that appear completely dead. An SMC reset takes 30 seconds and fixes the problem in a large number of cases.",
  },
  "macbook-overheating": {
    title: "MacBook Overheating Fix — Cool Down Your Mac",
    description: "MacBook running extremely hot with fans at max speed? Identify runaway processes, clear thermal paste, and use proper ventilation. Complete MacBook cooling guide.",
    keywords: "MacBook overheating, MacBook running hot, MacBook fans loud, MacBook thermal throttling, cool down MacBook, MacBook temperature fix",
    intro: "MacBooks are designed thin and light, which means heat management is critical. When a MacBook overheats, it enters thermal throttling — intentionally slowing the CPU down to reduce heat — making it feel sluggish. Before cleaning vents or replacing thermal paste, check Activity Monitor for a runaway process quietly consuming 100% CPU. This is the fix in the majority of cases.",
  },
  "macbook-battery-drain-fix": {
    title: "MacBook Battery Draining Fast — Restore Normal Battery Life",
    description: "MacBook battery life suddenly much worse? Energy-hungry apps, background sync, and display settings are common culprits. These fixes restore normal macOS battery life.",
    keywords: "MacBook battery draining fast, MacBook battery life bad, improve MacBook battery, MacBook battery fix, macOS battery drain, MacBook power usage",
    intro: "macOS has excellent built-in battery diagnostics that most users never check. Before changing any settings, open System Settings > Battery and review the 'Battery Usage by App' list. A single misbehaving app consuming background CPU is frequently responsible for draining hours of battery life. This guide shows you how to identify and eliminate it.",
  },
  "laptop-fan-making-noise": {
    title: "Laptop Fan Making Loud or Grinding Noise — Diagnosis and Fix",
    description: "Laptop fan making grinding, rattling, or constantly loud noises? This indicates dust buildup or a failing bearing. Here's how to diagnose and safely fix it.",
    keywords: "laptop fan making noise, laptop fan grinding, laptop fan loud, laptop fan rattling, laptop fan fix, noisy laptop fan fix",
    intro: "Not all fan noise is bad — a laptop fan spinning up under load is normal. But a grinding noise, rattling, or a fan that runs at full speed even when the laptop is idle tells a different story. Grinding means the bearing is failing (mechanical fix needed). Constant full-speed spinning means the thermal sensor or paste is the issue. This guide helps you tell the difference.",
  },
  "laptop-running-slow-fix": {
    title: "Laptop Running Slow — Speed Up Your Laptop in Minutes",
    description: "Laptop extremely slow, freezing, or taking minutes to open apps? High startup programs, low storage, and outdated drivers are the top causes. Fix it step by step.",
    keywords: "laptop running slow fix, laptop too slow, speed up laptop, laptop freezing, slow laptop Windows 10 11, laptop performance fix",
    intro: "A slow laptop isn't necessarily old or broken — it's usually suffering from software bloat. Windows laptops particularly accumulate startup programs, scheduled tasks, and background services that compound over time until even simple tasks feel sluggish. The good news: 80% of 'slow laptop' cases are fixed by the first three steps in this guide alone.",
  },
  "laptop-wont-connect-to-wifi": {
    title: "Laptop Won't Connect to WiFi — Network Adapter Fix Guide",
    description: "Laptop not connecting to WiFi or dropping the connection? Driver issues, IP conflicts, and router compatibility are the top causes. Fix WiFi on any Windows laptop.",
    keywords: "laptop won't connect to WiFi, laptop WiFi not working, laptop WiFi driver fix, Windows WiFi problem, laptop can't find WiFi, WiFi fix Windows laptop",
    intro: "A laptop that refuses to connect to WiFi while other devices connect fine is almost always a driver or Windows network stack issue — not a hardware problem. The most reliable first step is to check whether the WiFi adapter appears in Device Manager with a yellow warning icon, which points directly to a driver conflict that a simple update resolves.",
  },
  "laptop-screen-black-on-startup": {
    title: "Laptop Screen Black on Startup — How to Get Past Black Screen",
    description: "Laptop shows a black screen after powering on? Display driver issues, failed Windows startup, or a hardware connection problem are the likely causes. Fix it here.",
    keywords: "laptop screen black on startup, laptop black screen fix, laptop starts black screen, laptop won't display, black screen after boot, Windows black screen startup",
    intro: "A black screen on laptop startup is one of the most anxiety-inducing tech problems — but it's usually not as bad as it looks. The laptop is often running normally; only the display output is broken. Checking whether an external monitor shows the desktop immediately tells you whether this is a display/driver issue or a full boot failure. This single test narrows the fix significantly.",
  },
  "laptop-keyboard-typing-wrong-characters": {
    title: "Keyboard Typing Wrong Characters — Fix Language and Layout Issues",
    description: "Keyboard types wrong symbols or wrong characters? Language settings, accidentally toggled keyboard layouts, and sticky modifier keys are usually the cause. Fix it here.",
    keywords: "keyboard typing wrong characters, keyboard wrong symbols, keyboard layout wrong, keyboard types wrong letters, fix keyboard language Windows, keyboard input wrong",
    intro: "A keyboard suddenly typing wrong characters is almost always caused by an accidental keyboard shortcut switching the input language — not a hardware failure. On Windows, pressing Win + Space or Alt + Shift toggles between installed language layouts silently. If you recently set up multiple languages, a background switch is likely the entire explanation. Here's how to confirm and fix it.",
  },
  "laptop-stuck-on-loading-screen": {
    title: "Laptop Stuck on Loading Screen — Force Boot Fix",
    description: "Laptop stuck on the spinning loading screen for hours? Corrupted system files, a failed Windows Update, or a startup repair loop are the common causes. 6 fixes inside.",
    keywords: "laptop stuck on loading screen, laptop stuck on startup screen, Windows stuck loading, laptop won't boot past loading screen, Windows boot loop fix, laptop boot fix",
    intro: "A laptop stuck on the loading screen for more than 10 minutes is stuck in a broken boot cycle — not just being slow. This usually happens after a Windows Update that modified boot files without completing properly. The most reliable fix is accessing Windows Recovery Environment, which is available even when the OS itself can't load, and running Startup Repair.",
  },
  "windows-update-stuck": {
    title: "Windows Update Stuck — Fix Frozen Updates at 0%, 35%, or 99%",
    description: "Windows Update stuck and not moving for hours? Fix it by resetting update components, clearing the update cache, and restarting the Windows Update service.",
    keywords: "Windows Update stuck, Windows Update frozen, Windows Update not installing, Windows Update 0% stuck, fix Windows Update, Windows Update hanging fix",
    intro: "A Windows Update that stops at the same percentage for more than an hour is not downloading or installing — it's frozen. This is caused by corrupted files in the Windows Update cache folder that the update service keeps trying and failing to read. The fix involves stopping the service, deleting that cache, and restarting it — a process that takes about 5 minutes.",
  },
  "windows-black-screen-after-login": {
    title: "Windows Black Screen After Login — Explorer and GPU Driver Fix",
    description: "Windows shows a black screen after you log in? An Explorer.exe crash, GPU driver failure, or corrupted user profile are the causes. All fixable without reinstalling Windows.",
    keywords: "Windows black screen after login, Windows black screen fix, black screen after Windows login, Explorer crash black screen, Windows 10 11 black screen login fix",
    intro: "A black screen after the Windows login screen — where you hear sounds and the mouse cursor appears but nothing else — means Explorer.exe failed to start. This is the shell process responsible for the desktop, taskbar, and file system. It can be restarted from Task Manager in seconds. If that works temporarily but the problem returns, a deeper driver or profile fix is needed.",
  },
  "windows-slow-performance-fix": {
    title: "Windows Running Slow — Speed Up Windows 10 and 11",
    description: "Windows PC running slow, freezing, or responding sluggishly? Too many startup apps, fragmented drives, and outdated drivers are the leading causes. Speed it up here.",
    keywords: "Windows running slow fix, slow Windows 10, slow Windows 11, speed up Windows, Windows performance fix, PC running slow Windows, Windows sluggish fix",
    intro: "Windows performance degrades gradually over time through accumulated startup programs, background services, and fragmented data. Most users don't notice it happening until the system feels unusably slow. The most impactful single change you can make — before touching anything else — is opening Task Manager's Startup tab and disabling every program that doesn't need to run at boot.",
  },
  "windows-stuck-on-restart": {
    title: "Windows Stuck on Restarting Screen — How to Force Complete a Restart",
    description: "Windows stuck on the restarting screen for hours? A pending Update, failed driver, or stuck shutdown process is causing it. Here's how to safely force it to complete.",
    keywords: "Windows stuck on restart, Windows restarting stuck, Windows won't restart, PC stuck restarting, Windows 10 restart loop, Windows 11 restart stuck fix",
    intro: "When Windows gets stuck on 'Restarting...' for more than 30 minutes, it's waiting for a background process to shut down — and that process isn't responding. Windows Update closing sequences and certain antivirus programs are frequent culprits. A hard power-off at this point is safe for most modern SSDs and will not corrupt the system in the vast majority of cases.",
  },
  "windows-blue-screen-fix": {
    title: "Windows Blue Screen of Death (BSOD) Fix — Stop Code Guide",
    description: "Getting BSOD crashes on Windows 10 or 11? The stop code tells you exactly what failed. This guide covers the most common blue screen errors and their fixes.",
    keywords: "Windows blue screen fix, BSOD fix, blue screen of death Windows 10 11, Windows stop code fix, BSOD error fix, Windows crash fix, SYSTEM_SERVICE_EXCEPTION fix",
    intro: "A Windows Blue Screen of Death (BSOD) is actually a safety mechanism — Windows crashing itself to prevent data corruption. The stop code displayed is a direct clue to the cause. MEMORY_MANAGEMENT or PAGE_FAULT_IN_NONPAGED_AREA point to RAM. SYSTEM_THREAD_EXCEPTION_NOT_HANDLED usually points to a driver. Reading the stop code is the most important first step.",
  },
  "windows-error-0x80070005": {
    title: "Windows Error 0x80070005 — Access Denied Fix for Updates and Apps",
    description: "Windows error code 0x80070005 'Access Denied'? This Windows Update or permission error is caused by corrupted update components or blocked permissions. Step-by-step fix.",
    keywords: "Windows error 0x80070005, 0x80070005 fix, Windows Update access denied, error 0x80070005 Windows 10 11, fix Windows permission error, Windows Update error fix",
    intro: "Error 0x80070005 means 'Access Denied' — Windows tried to read or write a file but was blocked by permission settings. This happens most often during Windows Updates when a corrupted update component isn't accessible to the update service. Resetting the Windows Update components, which flushes all cached update data, resolves this in the majority of cases.",
  },
  "mouse-not-working-windows": {
    title: "Mouse Not Working on Windows — USB, Wireless, and Driver Fixes",
    description: "Mouse not responding on Windows? Whether USB, wireless, or Bluetooth, a driver conflict or USB power management setting is usually the cause. Complete fix guide.",
    keywords: "mouse not working Windows, mouse not responding Windows, USB mouse not working, wireless mouse fix Windows, mouse driver fix, mouse stopped working Windows 10 11",
    intro: "A mouse that stops working on Windows — especially after an update — is almost always a driver conflict rather than a hardware failure. Before buying a replacement, test the mouse on another USB port and another computer to rule out hardware. If the mouse works on another computer, the Windows driver or USB power suspension settings are the problem.",
  },
  "speaker-not-working-windows": {
    title: "No Sound from Speakers on Windows — Audio Fix Guide",
    description: "Speakers producing no sound on Windows? Wrong output device, disabled audio service, or a corrupted audio driver are the top causes. Fix sound on Windows 10 and 11.",
    keywords: "speakers not working Windows, no sound Windows, Windows audio fix, sound not working Windows 10 11, audio driver fix Windows, fix sound output Windows",
    intro: "When sound suddenly stops working on Windows, the cause is almost always one of three things: Windows switched the audio output to a different device (like HDMI), the Windows Audio service crashed and stopped running, or an audio driver update broke compatibility. Right-clicking the speaker icon in the taskbar and checking 'Sound settings' to verify the output device is the fastest first check.",
  },
  "microphone-not-working-windows": {
    title: "Microphone Not Working on Windows — Privacy and Driver Fix",
    description: "Microphone not detected or not working in Windows apps? Privacy settings blocking access, driver issues, and wrong default device are the three most common causes.",
    keywords: "microphone not working Windows, mic not working Windows 10 11, Windows microphone fix, microphone not detected Windows, fix microphone Windows, mic driver fix",
    intro: "Windows 10 and 11 introduced app-level microphone privacy controls that silently block all apps from accessing the mic when toggled off. This is the most common cause of a 'microphone not working' report — the hardware is fine but Windows privacy settings are blocking access. Check Settings > Privacy > Microphone before any driver troubleshooting.",
  },
  "bluetooth-not-working-windows": {
    title: "Bluetooth Not Working on Windows 10/11 — Complete Fix",
    description: "Bluetooth not working on Windows — adapter disabled, outdated driver, or Bluetooth service stopped. These 6 steps cover every cause on Windows 10 and 11.",
    keywords: "Bluetooth not working Windows, Bluetooth fix Windows 10 11, Windows Bluetooth adapter fix, Bluetooth won't turn on Windows, Bluetooth driver fix Windows",
    intro: "Bluetooth problems on Windows typically fall into two categories: the adapter itself is disabled or has a driver error, or the Bluetooth Support Service has stopped running. Windows Update is a common trigger for both. Opening Device Manager and looking for the Bluetooth adapter with a warning icon is the fastest way to confirm which category you're dealing with.",
  },
  "printer-not-connecting-wifi": {
    title: "Printer Won't Connect to WiFi — Network Printer Setup Fix",
    description: "Wireless printer failing to connect to your network? IP reassignment after a router change and driver conflicts are the top causes. Get your network printer working again.",
    keywords: "printer not connecting WiFi, wireless printer fix, network printer won't connect, printer WiFi setup fix, printer connection fix, printer network problem",
    intro: "A wireless printer that stopped connecting to WiFi is almost always caused by one of two things: the router was changed or reset and assigned the printer a new IP address, or the printer's stored WiFi credentials no longer match the current network password. Neither problem requires reinstalling the printer — a reconnect procedure through the printer's own menu resolves it.",
  },
  "printer-offline-fix": {
    title: "Printer Showing Offline — How to Bring Your Printer Back Online",
    description: "Printer showing as Offline in Windows even when it's on and connected? This is nearly always a Print Spooler issue or a network problem — not a hardware fault.",
    keywords: "printer offline fix, printer showing offline Windows, how to fix printer offline, printer offline Windows 10 11, printer not responding offline, print spooler fix",
    intro: "When Windows marks a printer as Offline, it usually means the Print Spooler service lost its connection to the printer and hasn't recovered. The printer itself may be perfectly functional. The fastest fix — used by technicians — is to delete all pending print jobs, restart the Print Spooler service, and set the printer to not allow Windows to manage it offline.",
  },
  "chrome-not-opening-fix": {
    title: "Chrome Won't Open — Fix Google Chrome Not Launching",
    description: "Google Chrome won't open or launch on Windows? A corrupted profile, background process, or missing files prevents it from starting. Complete fix guide here.",
    keywords: "Chrome not opening, Chrome won't launch, Google Chrome not starting, Chrome not working Windows, fix Chrome won't open, Chrome startup fix",
    intro: "Google Chrome failing to open is usually caused by a stuck Chrome process running invisibly in the background — the new Chrome window tries to attach to it, fails, and gives up silently. Opening Task Manager and killing all Chrome.exe processes, then trying again, resolves this in about half of cases. For the other half, a corrupted user profile is the cause.",
  },
  "chrome-keeps-crashing": {
    title: "Chrome Keeps Crashing — Fix Frequent Chrome Crashes and Freezes",
    description: "Chrome crashing, freezing, or showing 'Aw Snap' errors repeatedly? Extensions, corrupted profile data, hardware acceleration, and memory issues are the main causes.",
    keywords: "Chrome keeps crashing, Chrome crashing fix, Chrome Aw Snap fix, Chrome freezing Windows, Chrome crash fix, Google Chrome unstable, Chrome not working",
    intro: "A Chrome that crashes repeatedly is usually suffering from one of two issues: a problematic extension that injects code into web pages, or hardware acceleration conflicting with your GPU drivers. The simplest test is to open Chrome in Incognito mode — which disables extensions by default. If Chrome is stable in Incognito, an extension is the culprit.",
  },
  "windows-10-freezing-fix": {
    title: "Windows 10 Freezing Randomly — Fix System Lockups",
    description: "Windows 10 randomly freezing or completely locking up? RAM problems, a failing drive, overheating, and outdated drivers all cause system freezes. 6 proven fixes here.",
    keywords: "Windows 10 freezing fix, Windows 10 random freeze, PC freezing Windows 10, Windows 10 lockup fix, Windows 10 hangs randomly, Windows 10 freeze fix",
    intro: "A Windows 10 system that randomly freezes — mouse stops moving, keyboard unresponsive, screen frozen — is experiencing either a memory (RAM) problem, storage drive failure, or driver deadlock. The key diagnostic question is: does it freeze under specific conditions (gaming, file copying) or completely randomly? Specific-trigger freezes point to hardware; random ones often point to driver issues.",
  },
  "windows-11-start-menu-not-working": {
    title: "Windows 11 Start Menu Not Working — Fix Unresponsive Start Menu",
    description: "Windows 11 Start Menu not opening or responding? A corrupted Start Menu cache or broken explorer.exe process causes this. Fix it with these targeted steps.",
    keywords: "Windows 11 Start Menu not working, Start Menu not opening Windows 11, Windows 11 Start button fix, Start Menu unresponsive Windows 11, fix Start Menu Windows 11",
    intro: "The Windows 11 Start Menu runs as part of a new process called StartMenuExperienceHost.exe — separate from Explorer. When it stops responding, restarting Explorer (the old Windows 10 fix) doesn't help. You need to restart StartMenuExperienceHost.exe directly from Task Manager. This resolves the issue immediately without a full restart in most cases.",
  },
  "taskbar-not-responding-windows": {
    title: "Windows Taskbar Not Responding — Fix Frozen Taskbar",
    description: "Windows taskbar frozen, unresponsive, or not showing icons? These 6 steps — from Explorer restart to SFC scan — solve both temporary and permanent taskbar issues.",
    keywords: "taskbar not responding Windows, Windows taskbar frozen, taskbar not working, taskbar unresponsive fix, Windows taskbar fix, taskbar icons missing Windows",
    intro: "A frozen Windows taskbar is one of those issues that feels major but usually has a simple fix. The taskbar is rendered by Explorer.exe, and restarting that process via Task Manager brings it back instantly — without rebooting. If the taskbar freezes repeatedly after being restarted, the issue is deeper and likely involves a corrupted shell extension from a third-party app.",
  },
  "windows-explorer-keeps-crashing": {
    title: "Windows Explorer Keeps Crashing — Fix File Explorer Restarts",
    description: "Windows File Explorer crashing and restarting constantly? A corrupted shell extension, broken thumbnail cache, or damaged system file is usually the cause. Fix it here.",
    keywords: "Windows Explorer keeps crashing, File Explorer crashing, Explorer.exe crash fix, File Explorer keeps restarting, Windows Explorer fix, Explorer crashing Windows 10 11",
    intro: "When Windows Explorer crashes repeatedly, it almost always involves a shell extension — a piece of code that third-party software (like archive managers, cloud sync tools, or media players) injects into Explorer to add right-click menu options. One bad shell extension can crash Explorer every time you open a folder. ShellExView (free tool) makes it easy to identify and disable the culprit.",
  },
  "wifi-connected-but-no-internet": {
    title: "WiFi Connected But No Internet Access — Fix for All Devices",
    description: "Connected to WiFi but no internet? DNS failures, IP address conflicts, and corrupt network profiles cause this on Windows, Android, and iPhone. Fix it here.",
    keywords: "WiFi connected but no internet, connected to WiFi no internet access, WiFi no internet fix, internet not working WiFi connected, DNS fix no internet, WiFi connected no internet Windows Android iPhone",
    intro: "Seeing 'Connected, no internet' is one of the most common WiFi problems across all devices. Despite the confusing message, it doesn't mean the connection is broken — it means the device connected to your router but the router can't reach the internet, OR the device obtained an invalid IP address. These two causes have different fixes, and this guide covers both clearly.",
  },
  "router-not-working-fix": {
    title: "Router Not Working — Fix Internet Outages and Connection Problems",
    description: "Router not working and all your devices have no internet? Power cycling, firmware updates, and channel congestion fixes get your router back online. Full guide here.",
    keywords: "router not working fix, router not connecting, internet router fix, WiFi router problem, router no internet fix, how to fix router, router troubleshoot",
    intro: "A router that 'stops working' is usually not broken — it's stuck in a bad state after a power fluctuation, ISP-side change, or firmware bug. A complete power cycle (unplug for 60 seconds, not just restart via button) clears the router's memory tables and is the fix in the majority of cases. If the problem recurs regularly, the router's firmware likely needs updating.",
  },
  "youtube-not-loading-fix": {
    title: "YouTube Not Loading or Buffering — Fix on Any Device",
    description: "YouTube not loading, buffering constantly, or showing errors? DNS issues, browser cache, outdated app, and ISP throttling all cause YouTube problems. Fix it here.",
    keywords: "YouTube not loading fix, YouTube buffering fix, YouTube not working, YouTube error fix, fix YouTube on phone, YouTube slow loading, YouTube won't play",
    intro: "YouTube not loading can be caused by your device, your browser, your DNS server, or even your ISP. The fastest way to narrow it down: try YouTube on a different browser and a different device on the same network. If it's broken everywhere, it's your network or DNS. If it only fails in one browser, it's a cache or extension problem. This guide covers all scenarios.",
  },
  "slow-internet-speed-fix": {
    title: "Slow Internet Speed Fix — Boost Your Connection Speed",
    description: "Internet much slower than your plan speed? Router placement, ISP throttling, DNS settings, and device interference all reduce speeds. Fix slow internet on any device.",
    keywords: "slow internet speed fix, how to fix slow internet, internet speed slow fix, boost internet speed, slow WiFi fix, internet too slow, improve internet speed",
    intro: "Before calling your ISP about slow internet, run a speed test directly connected via Ethernet cable to your router. If wired speed is fast but WiFi is slow, the issue is your WiFi setup — not the ISP. If both are slow, compare the result to your subscribed plan speed. This simple test tells you whether to fix your home network or escalate to your provider.",
  },
  "dns-server-not-responding": {
    title: "DNS Server Not Responding — Fix and Switch to Faster DNS",
    description: "DNS server not responding error blocking all websites? Switch to Google DNS (8.8.8.8) or Cloudflare (1.1.1.1) with these steps. Works on Windows, Android, and iPhone.",
    keywords: "DNS server not responding fix, DNS not responding Windows, fix DNS error, change DNS Windows, DNS server fix, DNS error internet not working, how to fix DNS",
    intro: "When your browser says 'DNS server not responding', it means your device can't translate website names (like google.com) into IP addresses. You're connected to the internet — but you can't reach any website. The fix is straightforward: switch from your ISP's DNS server (which failed) to a public DNS server like Google's 8.8.8.8 or Cloudflare's 1.1.1.1.",
  },
  "vpn-not-connecting-fix": {
    title: "VPN Not Connecting — Troubleshoot VPN Connection Issues",
    description: "VPN not connecting or keeps dropping? Server issues, protocol conflicts, and firewall blocks are the main causes. Fix your VPN on Windows, Android, and iPhone.",
    keywords: "VPN not connecting fix, VPN won't connect, VPN connection problem, VPN keeps disconnecting, fix VPN Windows, VPN error fix, VPN troubleshoot",
    intro: "A VPN that won't connect is almost always being blocked by something — a firewall rule, an antivirus intercepting the connection, or the VPN protocol being incompatible with your network. Before assuming your VPN subscription has an issue, try switching the VPN protocol (from OpenVPN to WireGuard, or vice versa) — this alone resolves connection failures in many corporate and hotel networks.",
  },
  "wifi-keeps-disconnecting": {
    title: "WiFi Keeps Disconnecting — Stop Random WiFi Dropouts",
    description: "WiFi dropping connection every few minutes? Windows power management, outdated drivers, and router channel congestion cause intermittent WiFi disconnections. Fix it here.",
    keywords: "WiFi keeps disconnecting, WiFi keeps dropping, WiFi disconnecting randomly, fix WiFi disconnecting, WiFi unstable fix, WiFi drops fix Windows Android",
    intro: "Intermittent WiFi disconnections are more frustrating than a complete outage because the connection appears fine until it suddenly drops. The most common cause on Windows laptops is a power management setting that turns off the WiFi adapter to save battery — a 'feature' that costs you your connection. Disabling it takes 30 seconds and solves the problem permanently in many cases.",
  },
  "no-internet-after-windows-update": {
    title: "No Internet After Windows Update — Restore Network Connection",
    description: "Lost internet connection after a Windows Update? The update may have reset your network adapter or overwritten its driver. These steps restore your connection quickly.",
    keywords: "no internet after Windows update, Windows update broke internet, lost internet Windows update, network not working after update, Windows update network fix",
    intro: "A Windows Update that kills your internet connection is a known issue — certain cumulative updates include network adapter driver changes that conflict with existing configurations. The update usually doesn't break the adapter permanently; it just resets the IP settings or overwrites the driver to a version incompatible with your hardware. Rolling back the network adapter driver is often the complete fix.",
  },
  "ethernet-not-working-windows": {
    title: "Ethernet Not Working on Windows — Wired Connection Fix",
    description: "Ethernet cable plugged in but Windows shows no connection? The adapter driver, IP settings, or the physical cable could be the problem. Complete wired fix guide.",
    keywords: "ethernet not working Windows, ethernet not connecting, wired internet not working, ethernet cable not detected, fix ethernet Windows 10 11, LAN not working Windows",
    intro: "An Ethernet connection that doesn't work while WiFi does is usually not a cable or port problem — it's a Windows network adapter configuration issue. The fastest check: open Device Manager and look for the Ethernet adapter under Network Adapters. A yellow warning icon confirms a driver problem. No listing at all suggests a hardware fault or disabled adapter in BIOS.",
  },
  "android-app-keeps-crashing": {
    title: "Android App Keeps Crashing — Stop Force Close Errors",
    description: "Android app crashing or force closing repeatedly? Corrupted cache, low storage, and app compatibility issues are the top causes. Fix any crashing app on Android.",
    keywords: "Android app keeps crashing, Android app force close fix, app crashing Android fix, Android app not working, fix app crash Android, app keeps stopping Android",
    intro: "When an Android app crashes with 'App has stopped', the cause is almost always a corrupted cache file — leftover data from a previous app version that the new version can't read. Clearing the app's cache (not the data) takes 10 seconds and fixes this in the majority of cases. If clearing cache doesn't work, the app's data is corrupted and needs to be reset.",
  },
  "android-fast-charging-not-working": {
    title: "Android Fast Charging Not Working — Restore Rapid Charge",
    description: "Android fast charging stopped working and charging slowly? Cable quality, dirty port, and disabled fast charging settings are the common causes. Restore it here.",
    keywords: "Android fast charging not working, fast charge not working Android, slow charging Android fix, quick charge not working, Android charging speed fix, fast charge stopped working",
    intro: "Fast charging on Android requires three things to all work simultaneously: a fast-charge capable charger, a fast-charge cable (not all USB-C cables support fast charging), and the fast-charge feature enabled in settings. If any one of these fails, charging reverts to standard speed. The most commonly overlooked cause is using a fast charger with a slow cable — the cable is the bottleneck.",
  },
  "android-phone-not-turning-on": {
    title: "Android Phone Won't Turn On — Revive a Black Screen Android",
    description: "Android phone completely dead with a black screen? Dead battery, crashed OS, or failed boot are the causes. These steps revive most Android phones from a black screen.",
    keywords: "Android phone won't turn on, Android not turning on, Android dead black screen, how to turn on Android that won't start, fix Android not powering on",
    intro: "An Android phone that won't turn on at all can be completely dead from a drained battery, or it could be running fine internally but stuck in a boot failure that keeps the screen off. The easiest way to tell: plug it into a wall charger (not a computer) and wait 5 minutes. A battery charging indicator means the hardware is fine — it just ran out of power.",
  },
  "hotspot-not-working-android": {
    title: "Android Hotspot Not Working — Fix Mobile Hotspot Issues",
    description: "Android mobile hotspot not working or other devices can't connect? APN settings, data restrictions, and IP conflicts cause hotspot failures. Complete fix guide here.",
    keywords: "Android hotspot not working, mobile hotspot fix Android, hotspot not connecting, Android WiFi hotspot problem, fix hotspot Android, hotspot no internet fix",
    intro: "An Android hotspot that doesn't work usually falls into one of two scenarios: the hotspot turns on but other devices can't see it, or devices connect but have no internet. The first is a visibility/password issue. The second means your carrier is blocking hotspot use on your current data plan — something many carriers do unless you have an add-on or unlimited plan that specifically includes hotspot.",
  },
  "bluetooth-not-working-android": {
    title: "Bluetooth Not Working on Android — Pairing and Connection Fix",
    description: "Android Bluetooth not pairing, connecting, or finding devices? Bluetooth stack crashes and pairing cache corruption are easily fixed with these steps.",
    keywords: "Bluetooth not working Android, Android Bluetooth fix, Bluetooth won't pair Android, Android Bluetooth connection problem, fix Bluetooth Android, Bluetooth pairing failed Android",
    intro: "Android's Bluetooth stack occasionally crashes in a way that makes the radio appear functional (the toggle stays on) but prevents any pairing or connection from working. The definitive test: can you see other Bluetooth devices in the scan list? If you can see them but not connect, the pairing database is corrupted. If you can't see any devices at all, the Bluetooth stack itself needs a reset.",
  },
  "phone-screen-not-responding": {
    title: "Android Touchscreen Not Responding — Fix Unresponsive Screen",
    description: "Android touchscreen completely unresponsive or only working in some areas? Screen protector interference, calibration issues, and touch controller bugs are the causes.",
    keywords: "phone screen not responding, Android touchscreen not working, touch screen unresponsive Android, Android screen won't respond to touch, fix touchscreen Android",
    intro: "An Android touchscreen that stops responding is alarming but very often not a hardware problem. A thick or improperly applied screen protector can reduce touch sensitivity enough to make the screen appear broken. Remove any screen protector and test the screen with a clean, dry finger first — this resolves the issue surprisingly often before any software troubleshooting is needed.",
  },
  "phone-restarting-randomly": {
    title: "Android Phone Randomly Restarting — Stop Unexpected Reboots",
    description: "Android phone rebooting by itself without warning? Battery failure, overheating, app conflicts, and faulty system updates cause random restarts. Diagnose and fix it here.",
    keywords: "Android phone restarting randomly, Android random reboot fix, phone keeps restarting Android, Android unexpected restart fix, fix Android random restart",
    intro: "An Android phone that randomly restarts is usually suffering from one of three causes: a failing battery that drops voltage suddenly under load (causing a forced shutdown), an app stuck in a crash loop that triggers a system restart, or a rogue app with system-level permissions forcing restarts. Booting into Safe Mode — which disables all downloaded apps — immediately tells you if an app is responsible.",
  },
  "phone-storage-full-android": {
    title: "Android Phone Storage Full — Free Up Space Fast",
    description: "Android phone storage full even after deleting files? Cached data, system junk, and hidden downloads fill storage fast. Free gigabytes of space with these steps.",
    keywords: "Android phone storage full fix, storage full Android, free up space Android, Android storage problem, clear storage Android, Android out of space fix",
    intro: "Android phones appear to have 'no space' even after you delete everything visible because cached app data, offline maps, downloaded media files inside apps, and system update packages aren't visible in the Files app. WhatsApp alone can store gigabytes of received media that shows as 'app data' rather than photos. Understanding what's actually taking space is the key first step.",
  },
  "android-system-ui-not-responding": {
    title: "Android System UI Not Responding — Fix System UI Crash",
    description: "Android System UI keeps stopping or crashing? This causes the home screen and status bar to freeze. Clearing System UI cache and resetting launcher fixes it.",
    keywords: "Android System UI not responding, System UI has stopped Android, fix System UI Android, Android system UI crash, System UI fix Samsung Pixel",
    intro: "The 'System UI isn't responding' error on Android means the interface shell — responsible for the status bar, notification shade, and navigation buttons — has crashed. This can be triggered by a recent Android update modifying System UI components, a third-party launcher conflicting with the default shell, or corrupted system UI cache files. Clearing the cache resolves it in most cases.",
  },
  "google-play-store-not-working": {
    title: "Google Play Store Not Working — Fix Download and Loading Issues",
    description: "Google Play Store not loading, downloading, or showing errors? Cache issues, Google account conflicts, and Play Services failures cause most Play Store problems.",
    keywords: "Google Play Store not working, Play Store not downloading, Play Store fix, Play Store error fix, Google Play Store loading fix, Play Store not opening Android",
    intro: "Google Play Store problems almost always come from one of three sources: a corrupted Play Store cache, a sync issue with your Google account on the device, or a problem with Google Play Services (a background component the Play Store depends on). Clearing the cache of both 'Google Play Store' AND 'Google Play Services' is the fix that works in the most cases.",
  },
  "android-phone-overheating": {
    title: "Android Phone Overheating — Cool Down and Prevent Damage",
    description: "Android phone getting dangerously hot during use or charging? Rogue background apps, malware, and charging habits are the top causes. Fix overheating here.",
    keywords: "Android phone overheating fix, phone too hot Android, Android overheating while charging, fix overheating Android, Android phone hot fix, prevent Android overheating",
    intro: "An Android phone that gets hot enough to be uncomfortable is either working too hard or unable to shed heat properly. The key distinction: does it overheat while doing something intensive (gaming, video recording) or while completely idle? Idle overheating is a red flag — it means a background process, possibly malware, is consuming significant CPU resources without your knowledge.",
  },
  "android-wifi-not-working": {
    title: "Android WiFi Not Working — Fix Connection Problems on Android",
    description: "WiFi not working on your Android phone? Can't connect or keeps dropping? Network settings reset and adapter refresh solve most Android WiFi problems. Fix guide here.",
    keywords: "Android WiFi not working, WiFi fix Android, Android can't connect to WiFi, WiFi problems Android, fix Android WiFi connection, Android WiFi disconnecting",
    intro: "Android WiFi problems are usually caused by a corrupted saved network profile rather than a hardware fault. When Android saves a network profile with a wrong IP or DNS entry, every connection attempt fails even though the password is correct. The fix — forgetting the network and reconnecting from scratch — takes 30 seconds and resolves this class of problem completely.",
  },
  "android-battery-draining-fast": {
    title: "Android Battery Draining Fast — Fix Battery Life Issues",
    description: "Android battery dying too quickly? Screen brightness, background location tracking, rogue sync settings, and battery-hungry apps are draining your phone. Fix them here.",
    keywords: "Android battery draining fast, Android battery life fix, battery drain Android fix, Android battery dying quickly, improve Android battery life, fix Android battery",
    intro: "Android's Battery settings page contains a ranking of every app by battery consumption — and this single screen reveals the culprit in the majority of 'fast draining battery' cases. Look for apps consuming 5%+ of battery while in the background (not while you're actively using them). These background consumers are the primary target for all Android battery life improvements.",
  },
  "android-touchscreen-not-working": {
    title: "Android Touchscreen Not Working — Ghost Touch and Dead Zones Fix",
    description: "Android touchscreen unresponsive, has dead zones, or registers phantom touches? Software glitches and sensitivity settings can be fixed. Hardware damage requires repair.",
    keywords: "Android touchscreen not working, Android ghost touch fix, Android dead touch zone, touchscreen unresponsive Android, fix Android touch screen, Android screen touch problem",
    intro: "Android touchscreen issues fall into two clearly different categories: ghost touches (the screen registers touches you didn't make) and dead zones (areas that don't respond to touch at all). Ghost touches are almost always a software issue — a third-party app with accessibility permissions drawing invisible overlays on screen. Dead zones can be software or hardware. This guide distinguishes between the two.",
  },
  "android-bluetooth-headphones-not-connecting": {
    title: "Android Won't Connect to Bluetooth Headphones — Fix Pairing",
    description: "Android not pairing with or connecting to Bluetooth headphones? Corrupted pairing cache and audio codec conflicts prevent headphone connections. Fix in minutes.",
    keywords: "Android Bluetooth headphones not connecting, Bluetooth headphones won't pair Android, fix Bluetooth headphones Android, Android can't connect to headphones, Bluetooth audio fix Android",
    intro: "When Android paired successfully with Bluetooth headphones in the past but now refuses to reconnect, the pairing record in Android's Bluetooth database has become corrupted. Simply removing and re-pairing the headphones from scratch (delete the pairing from both the phone and the headphones) resolves this class of problem reliably. Don't try reconnecting from the existing pairing — always re-pair fresh.",
  },
  "iphone-storage-full-solution": {
    title: "iPhone Storage Full — Free Up Space Without Losing Data",
    description: "iPhone storage full with no room left? Photos, Messages, app data, and offline downloads fill up silently. These steps free gigabytes without deleting important data.",
    keywords: "iPhone storage full fix, free up iPhone storage, iPhone no space fix, iPhone storage management, how to free space iPhone, iPhone storage full solution",
    intro: "When iPhone says 'Storage Almost Full', the biggest hidden consumers are almost never what you expect. Messages attachments (videos sent via iMessage accumulate for years), offline Podcast downloads, and duplicate photos in 'Recently Deleted' that count against storage are all easily recoverable gigabytes. Settings > General > iPhone Storage shows every app with its exact consumption — start there.",
  },
  "iphone-not-charging-fix": {
    title: "iPhone Not Charging — Fix Charging Issues on Any iPhone",
    description: "iPhone not charging or showing no charge indicator? A dirty Lightning/USB-C port, bad cable, or software issue is usually the cause. Fix iPhone charging problems here.",
    keywords: "iPhone not charging fix, iPhone won't charge, iPhone charging problem, iPhone charging port fix, iPhone not charging properly, fix iPhone not charging",
    intro: "The single most common reason an iPhone stops charging is debris inside the Lightning or USB-C port — lint from a pocket compacts over time and prevents the cable from making proper electrical contact. Before any software fix or hardware repair, inspect the port with a flashlight and gently clean it with a wooden toothpick or anti-static brush. This fixes charging issues surprisingly often.",
  },
  "iphone-overheating-fix": {
    title: "iPhone Overheating — How to Cool Down Your iPhone",
    description: "iPhone getting too hot to hold? iOS throttles CPU performance when overheating. Background tasks and rogue apps cause excessive heat. Cool it down and fix it here.",
    keywords: "iPhone overheating fix, iPhone too hot fix, iPhone gets hot, iPhone overheating while charging, cool down iPhone, iPhone heat fix, iPhone temperature warning",
    intro: "iPhones display a 'Temperature: iPhone needs to cool down' warning when the internal temperature exceeds safe limits. But long before that warning appears, iOS quietly throttles CPU performance — making the phone feel sluggish as a side effect. If your iPhone is hot AND running slowly together, thermal throttling is the explanation. Identifying the heat source is the critical first step.",
  },
  "iphone-wifi-not-working": {
    title: "iPhone WiFi Not Working — Fix WiFi on iPhone",
    description: "iPhone WiFi not connecting or keeps dropping? Network profile corruption, DNS settings, and router incompatibility cause iPhone WiFi failures. Complete fix guide.",
    keywords: "iPhone WiFi not working, iPhone WiFi fix, iPhone can't connect to WiFi, iPhone WiFi dropping, fix iPhone WiFi, iPhone WiFi not connecting",
    intro: "iPhone WiFi problems often appear after an iOS update because the update modifies network stack settings that were previously customized. The fastest diagnostic: can your iPhone see the WiFi network name in the list? If yes but can't connect, the stored password or network profile is corrupt. If the network doesn't appear at all, the radio or DNS resolution is the issue.",
  },
  "iphone-face-id-not-working": {
    title: "Face ID Not Working — Fix Face ID on iPhone",
    description: "Face ID not unlocking your iPhone? After iOS updates, physical damage, or enrollment issues Face ID stops working. Reconfigure and troubleshoot Face ID with these steps.",
    keywords: "Face ID not working fix, iPhone Face ID fix, Face ID stopped working, fix Face ID after update, Face ID not recognizing, set up Face ID again",
    intro: "Face ID failure after an iOS update is more common than Apple's official documentation suggests. Updates sometimes corrupt the Face ID enrollment data stored in the Secure Enclave, requiring a re-enrollment from scratch. Before spending time in Settings, check one thing first: is there anything covering the Face ID sensor array at the top of the screen? A screen protector overlapping the notch area blocks it silently.",
  },
  "iphone-camera-not-working": {
    title: "iPhone Camera Not Working — Fix Black Screen and Camera Errors",
    description: "iPhone camera showing a black screen or not opening? A software crash or lens obstruction is usually the cause. Fix iPhone camera issues without a repair visit.",
    keywords: "iPhone camera not working, iPhone camera black screen fix, iPhone camera fix, iPhone rear camera not working, iPhone front camera fix, iPhone camera error",
    intro: "An iPhone camera that shows a black screen is almost always a software issue — the camera process crashed and needs to be reset. This is not the same as a hardware failure. Force closing the Camera app completely (swipe up from the app switcher) and reopening it resets the camera process. If this doesn't work, a quick restart resolves it in the vast majority of cases.",
  },
  "iphone-sound-not-working": {
    title: "iPhone Sound Not Working — Fix Silent iPhone Audio Issues",
    description: "No sound from iPhone speaker during calls, ringtones, or media? Silent switch, Bluetooth routing, and audio settings are the common culprits. Fix iPhone sound here.",
    keywords: "iPhone sound not working, iPhone no sound fix, iPhone speaker not working, iPhone audio fix, iPhone silent fix, sound stopped working iPhone, iPhone ringtone no sound",
    intro: "The most overlooked cause of 'no sound on iPhone' is the physical Ring/Silent switch on the left side — it's extremely easy to accidentally switch to silent without noticing. A small orange line visible on the switch means silent mode is active. Check this before anything else. The second most common cause: audio was routed to a Bluetooth device that's now out of range.",
  },
  "iphone-screen-freezing": {
    title: "iPhone Screen Frozen — Fix Unresponsive iPhone Screen",
    description: "iPhone screen frozen and completely unresponsive? Force restart procedure and iOS update fix most iPhone freezing issues. Steps for all iPhone models here.",
    keywords: "iPhone screen frozen fix, iPhone frozen fix, iPhone screen not responding, iPhone stuck frozen, iPhone unresponsive fix, how to unfreeze iPhone",
    intro: "A frozen iPhone screen — where nothing responds to touch and the display is stuck — is almost never permanent. Every iPhone model has a force restart sequence (different button combinations for different models) that resets the device instantly without losing any data. This force restart is different from a regular restart and specifically targets frozen-state hardware lockups.",
  },
  "iphone-touch-not-working": {
    title: "iPhone Touchscreen Not Working — Fix Touch Screen Issues",
    description: "iPhone touch not working in some areas or at all? Ghost touches, dead zones, and partially unresponsive screens can often be fixed without screen replacement.",
    keywords: "iPhone touch not working, iPhone touchscreen fix, iPhone screen not responding to touch, iPhone touch screen problem, fix iPhone touch, iPhone ghost touch fix",
    intro: "iPhone touchscreen issues have a very important early diagnostic step: the Touch Accommodation test in Settings > Accessibility. This lets you draw on the screen and see exactly which areas respond — pinpointing dead zones precisely. If certain screen regions consistently fail this test, you can distinguish between a software calibration issue and physical screen damage requiring professional repair.",
  },
  "iphone-bluetooth-not-working": {
    title: "iPhone Bluetooth Not Working — Fix Bluetooth Pairing Issues",
    description: "iPhone Bluetooth not finding, pairing, or connecting to devices? Bluetooth stack reset and forgotten device list clear fix most iPhone Bluetooth problems quickly.",
    keywords: "iPhone Bluetooth not working, iPhone Bluetooth fix, iPhone can't connect Bluetooth, iPhone Bluetooth pairing fix, fix Bluetooth iPhone, iPhone Bluetooth not connecting",
    intro: "iPhone Bluetooth problems are almost always in the stored pairing database rather than the hardware. When an iPhone has a corrupted Bluetooth pairing record for a device, it silently fails to connect without displaying a clear error. The reliable fix: forget ALL Bluetooth devices in Settings, turn Bluetooth off and back on, and re-pair from scratch. This rebuilds the pairing database clean.",
  },
  "iphone-mobile-data-not-working": {
    title: "iPhone Mobile Data Not Working — Fix Cellular Data Issues",
    description: "iPhone mobile data not working or very slow? APN settings, carrier updates, and data roaming configuration often cause mobile data failures. Fix cellular data here.",
    keywords: "iPhone mobile data not working, iPhone cellular data fix, iPhone internet not working, iPhone data not connecting, fix iPhone mobile data, iPhone 4G LTE not working",
    intro: "iPhone mobile data failures often occur after an iOS update that resets carrier settings — the configuration file your carrier provides that tells iOS how to connect to their network. Installing the latest carrier settings update (Settings > General > About, then wait for a carrier update prompt) resolves a large percentage of cellular data issues in minutes.",
  },
  "iphone-not-turning-on": {
    title: "iPhone Won't Turn On — Revive a Dead iPhone",
    description: "iPhone won't turn on even when plugged in? Force restart with the correct button combination, DFU mode restore, and battery check are the steps to revive it.",
    keywords: "iPhone won't turn on, iPhone not turning on fix, iPhone dead fix, iPhone won't power on, how to turn on dead iPhone, iPhone black screen won't turn on",
    intro: "An iPhone that won't power on has three possible states: completely dead battery, a software crash preventing boot, or a hardware failure. The key test is to plug it into a wall charger (not a computer USB port, which may not provide enough power) and wait 10 minutes. If you see a low battery screen, wait 20 minutes and try the force restart sequence. If nothing appears at all, recovery mode is the next step.",
  },
  "iphone-stuck-on-apple-logo": {
    title: "iPhone Stuck on Apple Logo — Fix Boot Loop",
    description: "iPhone stuck on Apple logo and won't boot past it? A failed iOS update or corrupted system files cause this boot loop. Force restart and Recovery Mode fix it.",
    keywords: "iPhone stuck on Apple logo fix, iPhone Apple logo loop, iPhone boot loop fix, iPhone won't go past Apple logo, fix iPhone stuck logo, iPhone recovery mode fix",
    intro: "An iPhone stuck on the Apple logo is in a boot loop — it starts loading iOS, hits a critical error in the system files, and restarts to try again. This is almost always caused by an iOS update that didn't complete properly. The fix path is clear: try force restart first (this works if the update partially completed), then Recovery Mode if force restart doesn't work, and finally DFU Mode as a last resort.",
  },
  "iphone-apps-crashing": {
    title: "iPhone Apps Crashing — Fix Apps That Keep Closing",
    description: "iPhone apps crashing on launch or during use? iOS memory pressure, outdated app versions, and corrupted app data are the top causes. Fix crashing apps on iPhone here.",
    keywords: "iPhone apps crashing fix, iPhone app keeps crashing, apps closing on iPhone fix, iPhone app crash fix, fix app crashes iPhone, apps not working iPhone",
    intro: "iPhone apps that crash immediately on launch usually have a corrupted local data cache — an issue where the app's stored data from a previous version is incompatible with the current install. Offloading the app (Settings > General > iPhone Storage > [App] > Offload App) deletes the app but keeps its data for reinstall, effectively refreshing the app binary without losing your account data.",
  },
  "iphone-battery-draining-fast": {
    title: "iPhone Battery Draining Fast — Improve iPhone Battery Life",
    description: "iPhone battery percentage dropping too fast? Background App Refresh, location services, and push email are draining your battery. Extend iPhone battery life with these steps.",
    keywords: "iPhone battery draining fast fix, iPhone battery life fix, improve iPhone battery, iPhone battery drain, fix iPhone battery, iPhone battery dying quickly",
    intro: "iOS includes a Battery Health and Activity report (Settings > Battery) that shows exact battery consumption per app over the last 24 hours and last 10 days. Check this before making any changes — it immediately shows which apps are consuming disproportionate battery in the background. Targeting the top two or three background consumers typically restores several hours of battery life.",
  },
  "app-store-not-downloading-apps": {
    title: "App Store Not Downloading Apps — Fix Stuck Downloads on iPhone",
    description: "App Store not downloading or installing apps? Stuck downloads and authorization failures are common on iPhone and iPad. These steps fix App Store issues.",
    keywords: "App Store not downloading apps, App Store not working iPhone, App Store stuck download fix, iPhone App Store fix, fix App Store downloads, App Store error iPhone",
    intro: "App Store downloads that get stuck usually have a simple cause: the App Store server lost track of the download session when the network briefly dropped. The single most effective fix — used by Apple Support as a first step — is to tap the stuck app icon on the home screen to pause it, then tap again to resume. This forces the App Store to restart the download session from scratch.",
  },
  "phone-not-connecting-to-pc": {
    title: "Phone Not Connecting to PC — Fix USB Phone Recognition Issues",
    description: "Phone not recognized by Windows when connected via USB? USB mode settings, driver installation, and cable quality are the main causes. Complete fix guide here.",
    keywords: "phone not connecting to PC, phone not recognized by Windows, USB phone fix, Android iPhone not connecting to computer, fix phone USB connection Windows",
    intro: "When a phone connects to a PC but nothing happens — no notification, no file access, no charging — the most common cause is the phone's USB connection mode being set to 'Charging Only' by default. Unlocking the phone and pulling down the notification shade reveals a USB connection notification. Tapping it and selecting 'File Transfer' or 'MTP' immediately makes the phone visible in Windows Explorer.",
  },
  "phone-call-quality-poor": {
    title: "Phone Call Quality Poor — Fix Choppy and Distorted Calls",
    description: "Phone calls sound choppy, distorted, or keep cutting out? Network signal strength, call settings, and speaker condition all affect call audio quality. Fix it here.",
    keywords: "phone call quality poor fix, fix call quality phone, choppy phone calls fix, bad call quality fix, phone calls cutting out, improve phone call quality",
    intro: "Poor call quality is not always a carrier issue — in fact, many 'bad calls' are caused by the phone's own noise cancellation processing incorrectly filtering your voice, or the earpiece speaker being partially blocked by debris. Disabling noise cancellation (Settings > Accessibility > Audio on iPhone, or Accessibility settings on Android) is a surprisingly effective fix for calls that sound muffled or robotic.",
  },
  "phone-sim-card-not-detected": {
    title: "SIM Card Not Detected — Fix No SIM or Invalid SIM Error",
    description: "Phone showing 'No SIM' or 'Invalid SIM' error? Dirty contacts, a software glitch, or a carrier issue cause SIM detection failures. Fix SIM errors step by step.",
    keywords: "SIM card not detected fix, no SIM card error, invalid SIM fix, SIM not recognized phone, fix SIM card error, phone says no SIM",
    intro: "A 'No SIM Card Installed' error can appear on a phone that has been using a SIM fine for months. Before assuming the SIM is damaged, power off the phone completely, remove the SIM tray, and inspect the SIM card for oxidation (a dull, dark coating on the gold contacts). Gently cleaning the contacts with a pencil eraser and reinserting the SIM resolves a significant portion of SIM detection errors.",
  },
  "phone-gps-not-working": {
    title: "Phone GPS Not Working — Fix Inaccurate or Unavailable Location",
    description: "GPS not working on your phone? Location inaccurate, unavailable, or not updating? These steps fix GPS on both Android and iPhone — settings to hardware checks.",
    keywords: "phone GPS not working fix, GPS not working Android iPhone, GPS inaccurate fix, phone location not working, GPS fix phone, GPS signal lost phone",
    intro: "GPS failure on smartphones almost always comes from software configuration rather than hardware damage — GPS chips rarely fail. The most common cause is Location Mode being set to 'Battery Saving' (which uses WiFi/cell towers instead of GPS satellites) or an app not having location permission. Switching to 'High Accuracy' or 'GPS Only' mode immediately resolves most GPS inaccuracy issues.",
  },
  "phone-speaker-not-working": {
    title: "Phone Speaker Not Working — Fix Silent or Quiet Speaker",
    description: "Phone speaker not working or extremely quiet? Physical blockage, silent mode routing, and Bluetooth conflicts silently redirect audio away from the speaker. Fix it here.",
    keywords: "phone speaker not working, phone speaker fix, phone no sound fix, Android iPhone speaker not working, fix phone speaker, phone speaker quiet fix",
    intro: "A phone speaker that seems broken is often routing audio somewhere else — to a Bluetooth device that's still 'connected' even when out of range, or to a wired headphone profile that got stuck active after removing headphones. Before assuming hardware failure, check whether audio plays through headphones when plugged in. If yes, the speaker hardware is fine — the audio routing is wrong.",
  },
};

const allSlugs = [
  "laptop-turns-on-then-off", "laptop-overheating-fix", "laptop-battery-draining-fast",
  "screen-flickering-laptop", "keyboard-not-working-laptop", "touchpad-not-working",
  "usb-device-not-recognized", "external-hard-drive-not-detected", "ssd-not-showing-in-windows",
  "macbook-not-turning-on", "macbook-overheating", "macbook-battery-drain-fix",
  "laptop-fan-making-noise", "laptop-running-slow-fix", "laptop-wont-connect-to-wifi",
  "laptop-screen-black-on-startup", "laptop-keyboard-typing-wrong-characters", "laptop-stuck-on-loading-screen",
  "windows-update-stuck", "windows-black-screen-after-login", "windows-slow-performance-fix",
  "windows-stuck-on-restart", "windows-blue-screen-fix", "windows-error-0x80070005",
  "mouse-not-working-windows", "speaker-not-working-windows", "microphone-not-working-windows",
  "bluetooth-not-working-windows", "printer-not-connecting-wifi", "printer-offline-fix",
  "chrome-not-opening-fix", "chrome-keeps-crashing", "windows-10-freezing-fix",
  "windows-11-start-menu-not-working", "taskbar-not-responding-windows", "windows-explorer-keeps-crashing",
  "wifi-connected-but-no-internet", "router-not-working-fix", "youtube-not-loading-fix",
  "slow-internet-speed-fix", "dns-server-not-responding", "vpn-not-connecting-fix",
  "wifi-keeps-disconnecting", "no-internet-after-windows-update", "ethernet-not-working-windows",
  "android-app-keeps-crashing", "android-fast-charging-not-working", "android-phone-not-turning-on",
  "hotspot-not-working-android", "bluetooth-not-working-android", "phone-screen-not-responding",
  "phone-restarting-randomly", "phone-storage-full-android", "android-system-ui-not-responding",
  "google-play-store-not-working", "android-phone-overheating", "android-wifi-not-working",
  "android-battery-draining-fast", "android-touchscreen-not-working", "android-bluetooth-headphones-not-connecting",
  "iphone-storage-full-solution", "iphone-not-charging-fix", "iphone-overheating-fix",
  "iphone-wifi-not-working", "iphone-face-id-not-working", "iphone-camera-not-working",
  "iphone-sound-not-working", "iphone-screen-freezing", "iphone-touch-not-working",
  "iphone-bluetooth-not-working", "iphone-mobile-data-not-working", "iphone-not-turning-on",
  "iphone-stuck-on-apple-logo", "iphone-apps-crashing", "iphone-battery-draining-fast",
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

  const specific = articleSpecificData[slug];
  const title = specific?.title ?? `How to Fix: ${rawTitle}`;
  const description = specific?.description ?? `Detailed step-by-step guide to fix ${rawTitle.toLowerCase()} on your device. Proven troubleshooting steps that resolve the problem fast — tested and verified fixes.`;
  const keywords = specific?.keywords ?? `fix ${rawTitle.toLowerCase()}, ${rawTitle.toLowerCase()} solution, how to fix ${rawTitle.toLowerCase()}, ${deviceName} troubleshoot`;
  const intro = specific?.intro ?? `This guide covers the most common causes of ${rawTitle.toLowerCase()} and walks through each fix in order of effectiveness. Follow the steps below — most issues are resolved within the first two steps.`;

  return {
    slug,
    title,
    category: categorySlug,
    description,
    intro,
    keywords,
    publishDate: new Date(Date.now() - index * 86400000 * 2).toISOString(),
    steps: content.steps,
    faqs: content.faqs,
    relatedSlugs: related,
    youtubeSearch: getYoutubeSearch(slug, title),
  };
});
