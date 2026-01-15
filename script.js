// Progress tracking object
const progressData = {
  anghasamana: { total: 13, checked: 0 },
  akushala: { total: 14, checked: 0 },
  sobhana: { total: 25, checked: 0 },
};

// Modal system
let modalResolve = null;

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  initializeCheckboxes();
  initializeButtons();
  initializeModal();
  // loadSavedData(); // Disabled so checkboxes reset on page refresh
  updateChart();
  updateProgressCounter();
});

// Initialize modal event listeners
function initializeModal() {
  const modal = document.getElementById("customModal");
  const confirmBtn = document.getElementById("modalConfirmBtn");
  const cancelBtn = document.getElementById("modalCancelBtn");

  confirmBtn.addEventListener("click", function () {
    if (modalResolve) {
      modalResolve(true);
      modalResolve = null;
    }
    closeModal();
  });

  cancelBtn.addEventListener("click", function () {
    if (modalResolve) {
      modalResolve(false);
      modalResolve = null;
    }
    closeModal();
  });

  // Close modal when clicking outside
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      if (modalResolve) {
        modalResolve(false);
        modalResolve = null;
      }
      closeModal();
    }
  });
}

// Show custom modal
function showModal(title, message) {
  return new Promise((resolve) => {
    modalResolve = resolve;
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalMessage").textContent = message;

    // Show standard buttons
    document.getElementById("modalCancelBtn").style.display = "inline-block";
    document.getElementById("modalConfirmBtn").style.display = "inline-block";
    document.getElementById("modalCancelBtn").textContent = "නැත";
    document.getElementById("modalConfirmBtn").textContent = "ඔව්";

    // Hide custom choice buttons if they exist
    const existingChoices = document.querySelectorAll(".modal-choice-btn");
    existingChoices.forEach((btn) => btn.remove());

    document.getElementById("customModal").classList.add("show");
  });
}

// Show custom modal with choice buttons
function showModalWithChoices(title, message, choices) {
  return new Promise((resolve) => {
    modalResolve = resolve;
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalMessage").textContent = message;

    // Hide standard buttons
    document.getElementById("modalCancelBtn").style.display = "none";
    document.getElementById("modalConfirmBtn").style.display = "none";

    // Remove existing choice buttons if any
    const existingChoices = document.querySelectorAll(".modal-choice-btn");
    existingChoices.forEach((btn) => btn.remove());

    // Add custom choice buttons
    const footer = document.querySelector(".modal-footer");
    choices.forEach((choice) => {
      const btn = document.createElement("button");
      btn.className = "modal-btn modal-choice-btn";
      btn.textContent = choice.label;
      btn.style.backgroundColor = choice.color || "#4caf50";
      btn.style.color = "#fff";
      btn.style.border = "2px solid " + (choice.borderColor || "#388e3c");

      btn.addEventListener("click", function () {
        if (modalResolve) {
          modalResolve(choice.value);
          modalResolve = null;
        }
        closeModal();
      });

      footer.appendChild(btn);
    });

    document.getElementById("customModal").classList.add("show");
  });
}

// Show info modal with only OK button
function showInfoModal(title, message) {
  return new Promise((resolve) => {
    modalResolve = resolve;
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalMessage").textContent = message;

    // Hide cancel button, show only confirm button as OK
    document.getElementById("modalCancelBtn").style.display = "none";
    document.getElementById("modalConfirmBtn").style.display = "inline-block";
    document.getElementById("modalConfirmBtn").textContent = "හරි";

    // Hide custom choice buttons if they exist
    const existingChoices = document.querySelectorAll(".modal-choice-btn");
    existingChoices.forEach((btn) => btn.remove());

    document.getElementById("customModal").classList.add("show");
  });
}

// Close custom modal
function closeModal() {
  document.getElementById("customModal").classList.remove("show");
}

// Initialize checkbox event listeners
function initializeCheckboxes() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", async function (event) {
      // Check mutual exclusion between akushala and sobhana FIRST
      const mutualExclusionValid = await checkAkushalaSobhanaMutualExclusion(
        this
      );
      if (!mutualExclusionValid) {
        event.preventDefault();
        this.checked = false;
        return;
      }

      // Check if sabba chitha sadarana checkboxes need to be checked first
      const isValid = await checkSabbhaChithaSadarana(this);
      if (!isValid) {
        event.preventDefault();
        this.checked = false;
        return;
      }

      // Check if sobhana sadharana checkboxes need to be selected together
      const sobhanaSadaranaValid = await checkSobhanaSadharana(this);
      if (!sobhanaSadaranaValid) {
        event.preventDefault();
        this.checked = false;
        return;
      }

      // Check if apramanya checkboxes need to be selected together
      const apramanyaValid = await checkApramanya(this);
      if (!apramanyaValid) {
        event.preventDefault();
        this.checked = false;
        return;
      }

      // Check if virathi checkboxes need to be selected together
      const virathiValid = await checkVirathi(this);
      if (!virathiValid) {
        event.preventDefault();
        this.checked = false;
        return;
      }

      // Check if akusala sadarana checkboxes need to be selected together
      const akusalaSadaranaGroupValid = await checkAkusalaSadarana(this);
      if (!akusalaSadaranaGroupValid) {
        event.preventDefault();
        this.checked = false;
        return;
      }

      // Check if dosa checkboxes need to be selected together
      const dosaValid = await checkDosa(this);
      if (!dosaValid) {
        event.preventDefault();
        this.checked = false;
        return;
      }

      // Check if theena-middha checkboxes need to be selected together
      const theenaMiddhaValid = await checkTheenaMiddha(this);
      if (!theenaMiddhaValid) {
        event.preventDefault();
        this.checked = false;
        return;
      }

      // Check if veeriya needs to be checked for akushala or sobhana
      const veeriyaValid = await checkVeeriyaForKusalaAkushala(this);
      if (!veeriyaValid) {
        event.preventDefault();
        this.checked = false;
        return;
      }

      // Check if akusala sadarana is selected before lobha or dosa sections
      const akusalaSadaranaValid = await checkAkusalaSadaranaForLobhaOrDosa(
        this
      );
      if (!akusalaSadaranaValid) {
        event.preventDefault();
        this.checked = false;
        return;
      }

      // Check if chandha needs to be checked when preethi is selected
      const chandhaValid = await checkChandhaForPreethi(this);
      if (!chandhaValid) {
        event.preventDefault();
        this.checked = false;
        return;
      }

      // Check if dhitti or mana needs to be checked when lobha is selected
      const lobhaValid = await checkDhittiOrManaForLobha(this);
      if (!lobhaValid) {
        event.preventDefault();
        this.checked = false;
        return;
      }

      updateProgress();
      updateChart();
      updateProgressCounter();
      saveData();
    });
  });
}

// Check if සබ්බ චිත්ත සාධාරණ (sabba chitha sadarana) checkboxes are all checked
async function checkSabbhaChithaSadarana(clickedCheckbox) {
  // Get all checkboxes in the sabba chitha sadarana section
  const sabbaChithaSection = document.querySelector(
    ".green-section .checkbox-list"
  );
  const sabbaChithaCheckboxes = sabbaChithaSection.querySelectorAll(
    'input[type="checkbox"]'
  );

  // Check if the clicked checkbox is one of the sabba chitha sadarana checkboxes
  let isFromSabbaChitha = false;
  sabbaChithaCheckboxes.forEach((cb) => {
    if (cb === clickedCheckbox) {
      isFromSabbaChitha = true;
    }
  });

  // If clicking a sabba chitha sadarana checkbox, select all and show message
  if (isFromSabbaChitha) {
    // Check all sabba chitha sadarana checkboxes
    sabbaChithaCheckboxes.forEach((cb) => {
      cb.checked = true;
    });

    // Show info modal with only OK button
    await showInfoModal("දැනුම්දීම", "මෙම චෛතසික සෑම සිතකම සැමවිටම පවතී.");

    return true;
  }

  // Check if all sabba chitha sadarana checkboxes are checked
  let allChecked = true;
  sabbaChithaCheckboxes.forEach((cb) => {
    if (!cb.checked) {
      allChecked = false;
    }
  });

  // If not all checked, show confirmation
  if (!allChecked) {
    const confirmed = await showModal(
      "දැනුම්දීම",
      "සබ්බ චිත්ත සාධාරණ (sabba chitha sadarana) - 7 ප්‍රථමයෙන් තෝරා ගත යුතුය.\n\nඔබට මේවා දැන් තෝරා ගැනීමට අවශ්‍යද?"
    );

    if (confirmed) {
      // Check all sabba chitha sadarana checkboxes
      sabbaChithaCheckboxes.forEach((cb) => {
        cb.checked = true;
      });
      return true;
    } else {
      return false;
    }
  }

  return true;
}

// Check if සොභන සධාරන (sobhana sadharana) checkboxes are all selected together
async function checkSobhanaSadharana(clickedCheckbox) {
  // Get all checkboxes in the sobhana sadharana section (yellow section)
  const sobhanaSadaranaSection = document.querySelector(
    ".yellow-section .checkbox-list"
  );
  const sobhanaSadaranaCheckboxes = sobhanaSadaranaSection.querySelectorAll(
    'input[type="checkbox"]'
  );

  // Check if the clicked checkbox is one of the sobhana sadharana checkboxes
  let isFromSobhanaSadharana = false;
  sobhanaSadaranaCheckboxes.forEach((cb) => {
    if (cb === clickedCheckbox) {
      isFromSobhanaSadharana = true;
    }
  });

  // If clicking a sobhana sadharana checkbox, select all and show message
  if (isFromSobhanaSadharana) {
    // Check all sobhana sadharana checkboxes
    sobhanaSadaranaCheckboxes.forEach((cb) => {
      cb.checked = true;
    });

    // Show info modal with only OK button
    await showInfoModal("දැනුම්දීම", "මෙම චෛතසික සෑම කුසල සිතකම සැමවිටම පවතී.");

    return true;
  }

  return true;
}

// Check if අප්‍රමාන්‍ය (apramanya) checkboxes are all selected together
async function checkApramanya(clickedCheckbox) {
  // Get all sobhana checkboxes
  const allSobhanaCheckboxes = document.querySelectorAll(
    'input[type="checkbox"][data-section="sobhana"]'
  );

  // Find the apramanya checkboxes by label text (කරුණ and මුදිතා)
  const apramanyaCheckboxes = Array.from(allSobhanaCheckboxes).filter((cb) => {
    const label = cb.parentElement.textContent;
    return (
      (label.includes("කරුණ") && label.includes("karuna")) ||
      (label.includes("මුදිතා") && label.includes("muditha"))
    );
  });

  // Check if the clicked checkbox is one of the apramanya checkboxes
  let isFromApramanya = false;
  apramanyaCheckboxes.forEach((cb) => {
    if (cb === clickedCheckbox) {
      isFromApramanya = true;
    }
  });

  // If clicking an apramanya checkbox, select all and show message
  if (isFromApramanya) {
    // Check all apramanya checkboxes
    apramanyaCheckboxes.forEach((cb) => {
      cb.checked = true;
    });

    // Show info modal with only OK button
    await showInfoModal("දැනුම්දීම", "මෙම චෛතසික සෑම කුසල සිතකම සැමවිටම පවතී.");

    return true;
  }

  return true;
}

// Check if විරති (virathi) checkboxes are all selected together
async function checkVirathi(clickedCheckbox) {
  // Get all sobhana checkboxes
  const allSobhanaCheckboxes = document.querySelectorAll(
    'input[type="checkbox"][data-section="sobhana"]'
  );

  // Find the virathi checkboxes by label text (සම්මා වචා, සම්මා කම්මන්තා, සම්මා ආජීවෝ)
  const virathiCheckboxes = Array.from(allSobhanaCheckboxes).filter((cb) => {
    const label = cb.parentElement.textContent;
    return (
      (label.includes("සම්මා වචා") && label.includes("samma wacha")) ||
      (label.includes("කම්මන්තා") && label.includes("samma kamantha")) ||
      (label.includes("සම්මා ආජීවෝ") && label.includes("samma ajeewa"))
    );
  });

  // Check if the clicked checkbox is one of the virathi checkboxes
  let isFromVirathi = false;
  virathiCheckboxes.forEach((cb) => {
    if (cb === clickedCheckbox) {
      isFromVirathi = true;
    }
  });

  // If clicking a virathi checkbox, select all and show message
  if (isFromVirathi) {
    // Check all virathi checkboxes
    virathiCheckboxes.forEach((cb) => {
      cb.checked = true;
    });

    // Show info modal with only OK button
    await showInfoModal("දැනුම්දීම", "මෙම චෛතසික සෑම කුසල සිතකම සැමවිටම පවතී.");

    return true;
  }

  return true;
}

// Check if අකුසල සාධාරණ (akusala sadarana) checkboxes are all selected together
async function checkAkusalaSadarana(clickedCheckbox) {
  // Get all akushala checkboxes
  const allAkushalaCheckboxes = document.querySelectorAll(
    'input[type="checkbox"][data-section="akushala"]'
  );

  // Find the akusala sadarana checkboxes by label text (මෝහ, අහිරික, අනොත්තෙප්ප, ඉද්ධචච)
  const akusalaSadaranaCheckboxes = Array.from(allAkushalaCheckboxes).filter(
    (cb) => {
      const label = cb.parentElement.textContent;
      return (
        (label.includes("මෝහ") && label.includes("moha")) ||
        (label.includes("අහිරික") && label.includes("ahirika")) ||
        (label.includes("අනොත්තෙප්ප") && label.includes("anotthappa")) ||
        (label.includes("ඉද්ධචච") && label.includes("uddhacha"))
      );
    }
  );

  // Check if the clicked checkbox is one of the akusala sadarana checkboxes
  let isFromAkusalaSadarana = false;
  akusalaSadaranaCheckboxes.forEach((cb) => {
    if (cb === clickedCheckbox) {
      isFromAkusalaSadarana = true;
    }
  });

  // If clicking an akusala sadarana checkbox, select all and show message
  if (isFromAkusalaSadarana) {
    // Check all akusala sadarana checkboxes
    akusalaSadaranaCheckboxes.forEach((cb) => {
      cb.checked = true;
    });

    // Show info modal with only OK button
    await showInfoModal(
      "දැනුම්දීම",
      "මෙම චෛතසික සෑම අකුසල සිතකම සැමවිටම පවතී."
    );

    return true;
  }

  return true;
}

// Check if දොස චතුස්තකය (dosa) checkboxes are all selected together
async function checkDosa(clickedCheckbox) {
  // Get all akushala checkboxes
  const allAkushalaCheckboxes = document.querySelectorAll(
    'input[type="checkbox"][data-section="akushala"]'
  );

  // Find the dosa checkboxes by label text (දොස, ඉස්සා, මිච්ඡරිය, කුකුච්ච)
  const dosaCheckboxes = Array.from(allAkushalaCheckboxes).filter((cb) => {
    const label = cb.parentElement.textContent;
    return (
      (label.includes("දොස") && label.includes("dhosa")) ||
      (label.includes("ඉස්සා") && label.includes("issa")) ||
      (label.includes("මිච්ඡරිය") && label.includes("michariya")) ||
      (label.includes("කුකුච්ච") && label.includes("kukucha"))
    );
  });

  // Check if the clicked checkbox is one of the dosa checkboxes
  let isFromDosa = false;
  dosaCheckboxes.forEach((cb) => {
    if (cb === clickedCheckbox) {
      isFromDosa = true;
    }
  });

  // If clicking a dosa checkbox, select all and show message
  if (isFromDosa) {
    // Check all dosa checkboxes
    dosaCheckboxes.forEach((cb) => {
      cb.checked = true;
    });

    // Show info modal with only OK button
    await showInfoModal(
      "දැනුම්දීම",
      "මෙම චෛතසික සෑම අකුසල සිතකම සැමවිටම පවතී."
    );

    return true;
  }

  return true;
}

// Check if තින-මිද්ධ (theena-middha) checkboxes are selected together
async function checkTheenaMiddha(clickedCheckbox) {
  // Get all akushala checkboxes
  const allAkushalaCheckboxes = document.querySelectorAll(
    'input[type="checkbox"][data-section="akushala"]'
  );

  // Find theena and middha checkboxes
  let theenaCheckbox = null;
  let middhaCheckbox = null;

  allAkushalaCheckboxes.forEach((cb) => {
    const label = cb.parentElement.textContent;
    if (label.includes("තින") && label.includes("theena")) {
      theenaCheckbox = cb;
    }
    if (label.includes("මිද්ධ") && label.includes("middha")) {
      middhaCheckbox = cb;
    }
  });

  // Check if the clicked checkbox is theena or middha
  const isTheena = clickedCheckbox === theenaCheckbox;
  const isMiddha = clickedCheckbox === middhaCheckbox;

  // If clicking theena or middha, select both
  if (isTheena || isMiddha) {
    if (theenaCheckbox) theenaCheckbox.checked = true;
    if (middhaCheckbox) middhaCheckbox.checked = true;

    // Show info modal with only OK button
    await showInfoModal(
      "දැනුම්දීම",
      "මෙම චෛතසික සෑම අකුසල සිතකම සැමවිටම පවතී."
    );

    return true;
  }

  return true;
}

// Check mutual exclusion between අකුසල and සෝබන
async function checkAkushalaSobhanaMutualExclusion(clickedCheckbox) {
  const section = clickedCheckbox.getAttribute("data-section");

  // Only apply this rule for akushala and sobhana checkboxes
  if (section !== "akushala" && section !== "sobhana") {
    return true;
  }

  // Determine the opposite section
  const oppositeSection = section === "akushala" ? "sobhana" : "akushala";

  // Check if any checkbox in the opposite section is checked
  const oppositeCheckboxes = document.querySelectorAll(
    `input[type="checkbox"][data-section="${oppositeSection}"]`
  );

  let hasOppositeChecked = false;
  oppositeCheckboxes.forEach((cb) => {
    if (cb.checked) {
      hasOppositeChecked = true;
    }
  });

  // If opposite section has checked items, show error and prevent
  if (hasOppositeChecked) {
    await showModal("දැනුම්දීම", "දැනට තෝරා ඇති චෛතසික සමඟ මෙය නොයෙදේ");
    return false;
  }

  return true;
}

// Check if අකුසල සාධාරණ is selected before ලෝභ or දොස sections
async function checkAkusalaSadaranaForLobhaOrDosa(clickedCheckbox) {
  const section = clickedCheckbox.getAttribute("data-section");

  // Only apply this rule for akushala checkboxes
  if (section !== "akushala") {
    return true;
  }

  // Check if the clicked checkbox is from lobha or dosa sections
  const label = clickedCheckbox.parentElement.textContent;

  // Identify if it's from lobha section (ලෝභ, දිට්ඨි, මාන)
  const isLobhaSection =
    (label.includes("ලෝභ") && label.includes("lobha")) ||
    (label.includes("දිට්ඨි") && label.includes("dhitti")) ||
    (label.includes("මාන") && label.includes("mana"));

  // Identify if it's from dosa section (දොස, ඉස්සා, මිච්ඡරිය, කුකුච්ච)
  const isDosaSection =
    (label.includes("දොස") && label.includes("dhosa")) ||
    (label.includes("ඉස්සා") && label.includes("issa")) ||
    (label.includes("මිච්ඡරිය") && label.includes("michariya")) ||
    (label.includes("කුකුච්ච") && label.includes("kukucha"));

  // If not from lobha or dosa sections, allow
  if (!isLobhaSection && !isDosaSection) {
    return true;
  }

  // Find all අකුසල සාධාරණ checkboxes (මෝහ, අහිරික, අනොත්තෙප්ප, උද්ධචච)
  const akusalaSadaranaCheckboxes = Array.from(
    document.querySelectorAll(
      '.pink-section .checkbox-list input[type="checkbox"]'
    )
  ).filter((cb) => {
    const cbLabel = cb.parentElement.textContent;
    return (
      (cbLabel.includes("මෝහ") && cbLabel.includes("moha")) ||
      (cbLabel.includes("අහිරික") && cbLabel.includes("ahirika")) ||
      (cbLabel.includes("අනොත්තෙප්ප") && cbLabel.includes("anotthappa")) ||
      (cbLabel.includes("උද්ධචච") && cbLabel.includes("uddhacha"))
    );
  });

  // Check if ALL අකුසල සාධාරණ checkboxes are checked
  let allAkusalaSadaranaChecked = true;
  akusalaSadaranaCheckboxes.forEach((cb) => {
    if (!cb.checked) {
      allAkusalaSadaranaChecked = false;
    }
  });

  // If not all අකුසල සාධාරණ are checked, show confirmation modal
  if (!allAkusalaSadaranaChecked) {
    const confirmed = await showModal(
      "දැනුම්දීම",
      "අකුසල සාධාරණ (4) ප්‍රථමයෙන් තෝරා ගත යුතුය.\n\nඔබට මේවා දැන් තෝරා ගැනීමට අවශ්‍යද?"
    );

    if (confirmed) {
      // Check all අකුසල සාධාරණ checkboxes
      akusalaSadaranaCheckboxes.forEach((cb) => {
        cb.checked = true;
      });
      return true;
    } else {
      return false;
    }
  }

  return true;
}

// Check if වීරිය (veeriya) needs to be checked for අකුසල or සෝබන
async function checkVeeriyaForKusalaAkushala(clickedCheckbox) {
  const section = clickedCheckbox.getAttribute("data-section");

  // Only apply this rule for akushala and sobhana checkboxes
  if (section !== "akushala" && section !== "sobhana") {
    return true;
  }

  // Find the වීරිය (veeriya) checkbox
  const veeriyaCheckbox = Array.from(
    document.querySelectorAll(
      '.blue-section .checkbox-list input[type="checkbox"]'
    )
  ).find((cb) => {
    const label = cb.parentElement.textContent;
    return label.includes("වීරිය") || label.includes("veeriya");
  });

  // If වීරිය is not found, allow the action
  if (!veeriyaCheckbox) {
    return true;
  }

  // If වීරිය is already checked, allow the action
  if (veeriyaCheckbox.checked) {
    return true;
  }

  // If වීරිය is not checked, show confirmation
  const confirmed = await showModal(
    "දැනුම්දීම",
    "සෑම කුසල හෝ අකුසල සිතක් සමඟ වීරිය (veeriya) තිබිය යුතුය.\n\nඔබට වීරිය දැන් තෝරා ගැනීමට අවශ්‍යද?"
  );

  if (confirmed) {
    veeriyaCheckbox.checked = true;
    return true;
  } else {
    return false;
  }
}

// Check if ඡන්ද (chandha) needs to be checked when ප්‍රීතිය (preethi) is selected
async function checkChandhaForPreethi(clickedCheckbox) {
  // Check if the clicked checkbox is preethi
  const label = clickedCheckbox.parentElement.textContent;
  const isPreethi = label.includes("පීතී") || label.includes("preethi");

  // If not clicking preethi, allow the action
  if (!isPreethi) {
    return true;
  }

  // Find the ඡන්ද (chandha) checkbox
  const chandhaCheckbox = Array.from(
    document.querySelectorAll(
      '.blue-section .checkbox-list input[type="checkbox"]'
    )
  ).find((cb) => {
    const cbLabel = cb.parentElement.textContent;
    return cbLabel.includes("ඡන්ද") || cbLabel.includes("chandha");
  });

  // If chandha is not found, allow the action
  if (!chandhaCheckbox) {
    return true;
  }

  // If chandha is already checked, allow the action
  if (chandhaCheckbox.checked) {
    return true;
  }

  // If chandha is not checked, show confirmation
  const confirmed = await showModal(
    "දැනුම්දීම",
    "ප්‍රීතිය සමඟ ජන්දය යෙදිය යුතුය.\n\nඔබට ජන්දය දැන් තෝරා ගැනීමට අවශ්‍යද?"
  );

  if (confirmed) {
    chandhaCheckbox.checked = true;
    return true;
  } else {
    return false;
  }
}

// Check if දිට්ඨිය or මානය needs to be checked when ලෝභය is selected
async function checkDhittiOrManaForLobha(clickedCheckbox) {
  // Check if the clicked checkbox is lobha
  const label = clickedCheckbox.parentElement.textContent;
  const isLobha = label.includes("ලෝභ") && label.includes("lobha");

  // If not clicking lobha, allow the action
  if (!isLobha) {
    return true;
  }

  // Find දිට්ඨිය (dhitti) and මානය (mana) checkboxes
  const akushalaCheckboxes = document.querySelectorAll(
    '.pink-section .checkbox-list input[type="checkbox"]'
  );

  let dhittiCheckbox = null;
  let manaCheckbox = null;

  akushalaCheckboxes.forEach((cb) => {
    const cbLabel = cb.parentElement.textContent;
    if (cbLabel.includes("දිට්ඨි") || cbLabel.includes("dhitti")) {
      dhittiCheckbox = cb;
    }
    if (cbLabel.includes("මාන") && cbLabel.includes("mana")) {
      manaCheckbox = cb;
    }
  });

  // If either dhitti or mana is already checked, allow the action
  if (
    (dhittiCheckbox && dhittiCheckbox.checked) ||
    (manaCheckbox && manaCheckbox.checked)
  ) {
    return true;
  }

  // Show modal with choice between dhitti and mana
  const choice = await showModalWithChoices(
    "දැනුම්දීම",
    "ලෝභය සමඟ දිට්ඨිය හෝ මානය යෙදිය යුතුය.\n\nකරුණාකර එකක් තෝරන්න:",
    [
      {
        label: "දිට්ඨිය",
        value: "dhitti",
        color: "#2196f3",
        borderColor: "#1976d2",
      },
      {
        label: "මානය",
        value: "mana",
        color: "#ff9800",
        borderColor: "#f57c00",
      },
      {
        label: "අවලංගු කරන්න",
        value: false,
        color: "#e0e0e0",
        borderColor: "#bdbdbd",
      },
    ]
  );

  if (choice === "dhitti" && dhittiCheckbox) {
    dhittiCheckbox.checked = true;
    return true;
  } else if (choice === "mana" && manaCheckbox) {
    manaCheckbox.checked = true;
    return true;
  } else {
    return false;
  }
}

// Initialize button event listeners
function initializeButtons() {
  // Reset button
  document.getElementById("resetBtn").addEventListener("click", function () {
    if (confirm("ඔබට සියලුම දත්ත නැවත සැකසීමට අවශ්‍යද?")) {
      resetAllData();
    }
  });

  // Save button
  document.getElementById("saveBtn").addEventListener("click", function () {
    saveData();
    alert("දත්ත සාර්ථකව සුරකින ලදි!");
  });

  // Reload button
  document.getElementById("reloadBtn").addEventListener("click", function () {
    location.reload();
  });

  // Save notes on change
  document.getElementById("notesArea").addEventListener("input", function () {
    saveData();
  });

  // Frame refresh buttons
  const frameRefreshButtons = document.querySelectorAll(".frame-refresh-btn");
  frameRefreshButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const frame = this.getAttribute("data-frame");
      refreshFrame(frame);
    });
  });
}

// Update progress based on checked checkboxes
function updateProgress() {
  // Reset counts
  progressData.anghasamana.checked = 0;
  progressData.akushala.checked = 0;
  progressData.sobhana.checked = 0;

  // Count checked items for each section
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const section = checkbox.getAttribute("data-section");
      if (section === "anghasamana") {
        progressData.anghasamana.checked++;
      } else if (section === "akushala") {
        progressData.akushala.checked++;
      } else if (
        section === "sobhana" ||
        section === "virathi" ||
        section === "apramanya" ||
        section === "amoha"
      ) {
        progressData.sobhana.checked++;
      }
    }
  });

  // Update labels
  document.getElementById(
    "label1"
  ).textContent = `${progressData.anghasamana.checked}/${progressData.anghasamana.total}`;
  document.getElementById(
    "label2"
  ).textContent = `${progressData.akushala.checked}/${progressData.akushala.total}`;
  document.getElementById(
    "label3"
  ).textContent = `${progressData.sobhana.checked}/${progressData.sobhana.total}`;
}

// Update progress counter
function updateProgressCounter() {
  const totalChecked =
    progressData.anghasamana.checked +
    progressData.akushala.checked +
    progressData.sobhana.checked;
  document.getElementById("progressCount").textContent = totalChecked;
}

// Draw the bar chart
function updateChart() {
  const canvas = document.getElementById("progressChart");
  const ctx = canvas.getContext("2d");

  // Set canvas size
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Chart settings
  const padding = { top: 30, right: 20, bottom: 50, left: 50 };
  const chartWidth = canvas.width - padding.left - padding.right;
  const chartHeight = canvas.height - padding.top - padding.bottom;

  // Find max value for Y-axis
  const maxValue = Math.max(
    progressData.anghasamana.total,
    progressData.akushala.total,
    progressData.sobhana.total
  );
  const yAxisMax = Math.ceil(maxValue / 5) * 5; // Round up to nearest 5

  // Draw Y-axis
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(padding.left, padding.top);
  ctx.lineTo(padding.left, padding.top + chartHeight);
  ctx.stroke();

  // Draw X-axis
  ctx.beginPath();
  ctx.moveTo(padding.left, padding.top + chartHeight);
  ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight);
  ctx.stroke();

  // Draw Y-axis labels and grid lines
  ctx.fillStyle = "#333";
  ctx.font = "12px Arial";
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";

  for (let i = 0; i <= 4; i++) {
    const value = (yAxisMax / 4) * i;
    const y = padding.top + chartHeight - (i * chartHeight) / 4;

    // Draw label
    ctx.fillText(Math.round(value), padding.left - 10, y);

    // Draw grid line
    ctx.strokeStyle = "#e0e0e0";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(padding.left + chartWidth, y);
    ctx.stroke();
  }

  // Y-axis title
  ctx.save();
  ctx.translate(15, padding.top + chartHeight / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = "center";
  ctx.font = "bold 14px Arial";
  ctx.fillText("චෛතයික ගණන", 0, 0);
  ctx.restore();

  // Draw bars
  const bars = [
    {
      label: "අඤ්ඤසමාන",
      checked: progressData.anghasamana.checked,
      total: progressData.anghasamana.total,
      color: "#4caf50",
    },
    {
      label: "අකුසල",
      checked: progressData.akushala.checked,
      total: progressData.akushala.total,
      color: "#e91e63",
    },
    {
      label: "සොභන",
      checked: progressData.sobhana.checked,
      total: progressData.sobhana.total,
      color: "#fdd835",
    },
  ];

  const barWidth = chartWidth / (bars.length * 2);
  const barSpacing = barWidth;

  bars.forEach((bar, index) => {
    const x = padding.left + barSpacing + index * (barWidth + barSpacing);
    const barHeight = (bar.checked / yAxisMax) * chartHeight;
    const y = padding.top + chartHeight - barHeight;

    // Draw bar
    ctx.fillStyle = bar.color;
    ctx.fillRect(x, y, barWidth, barHeight);

    // Draw bar border
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, barWidth, barHeight);

    // Draw value on top of bar
    if (bar.checked > 0) {
      ctx.fillStyle = "#000";
      ctx.font = "bold 14px Arial";
      ctx.textAlign = "center";
      ctx.fillText(bar.checked, x + barWidth / 2, y - 10);
    }

    // Draw X-axis label
    ctx.fillStyle = "#000";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      `${bar.checked}/${bar.total}`,
      x + barWidth / 2,
      padding.top + chartHeight + 20
    );
  });
}

// Save data to localStorage
function saveData() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const checkboxStates = [];

  checkboxes.forEach((checkbox, index) => {
    checkboxStates.push({
      index: index,
      checked: checkbox.checked,
    });
  });

  const notes = document.getElementById("notesArea").value;

  const dataToSave = {
    checkboxes: checkboxStates,
    notes: notes,
    timestamp: new Date().toISOString(),
  };

  localStorage.setItem("progressData", JSON.stringify(dataToSave));
}

// Load saved data from localStorage
function loadSavedData() {
  const savedData = localStorage.getItem("progressData");

  if (savedData) {
    try {
      const data = JSON.parse(savedData);

      // Restore checkbox states
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      data.checkboxes.forEach((item) => {
        if (checkboxes[item.index]) {
          checkboxes[item.index].checked = item.checked;
        }
      });

      // Restore notes
      if (data.notes) {
        document.getElementById("notesArea").value = data.notes;
      }

      // Update displays
      updateProgress();
      updateChart();
      updateProgressCounter();
    } catch (error) {
      console.error("Error loading saved data:", error);
    }
  }
}

// Reset all data
function resetAllData() {
  // Uncheck all checkboxes
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });

  // Clear notes
  document.getElementById("notesArea").value = "";

  // Clear localStorage
  localStorage.removeItem("progressData");

  // Update displays
  updateProgress();
  updateChart();
  updateProgressCounter();
}

// Handle window resize for chart
window.addEventListener("resize", function () {
  updateChart();
});

// Refresh a specific frame (uncheck all checkboxes in that frame)
function refreshFrame(frameName) {
  const checkboxes = document.querySelectorAll(
    `input[type="checkbox"][data-section="${frameName}"]`
  );

  // For sobhana, also include related sections
  if (frameName === "sobhana") {
    const sobhanaCheckboxes = document.querySelectorAll(
      'input[type="checkbox"][data-section="sobhana"], input[type="checkbox"][data-section="virathi"], input[type="checkbox"][data-section="apramanya"], input[type="checkbox"][data-section="amoha"]'
    );
    sobhanaCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  } else {
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }

  // Update displays
  updateProgress();
  updateChart();
  updateProgressCounter();
  saveData();
}
