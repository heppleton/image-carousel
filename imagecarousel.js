const images = ["bay.jpg", "bridge.jpg", "galaxy.jpg", "malaga.jpg", "prague.jpg",
    "nightsky.jpg", "delacroix.jpg", "paris.jpg", "park.jpg", "rocks.jpg", "shuttle.jpg",
    "vaporwave.jpg", "woodland.jpg", "monalisa.jpg"];

const makeImageSlider = () => {
    let imageIndex = 5;
    const checkIndex = () => {
        if (imageIndex === images.length) {
            imageIndex = 0;
        }
        if (imageIndex < 0) {
            imageIndex += images.length;
        }
    }

    let intervalID;

    const controlBox = document.createElement("div");
    controlBox.classList.add("control-box");
    document.querySelector("body").appendChild(controlBox);

    const slider = document.createElement("div");
    slider.classList.add("slider");

    const leftButton = document.createElement("div");
    leftButton.classList.add("button-area");
    leftButton.addEventListener("mouseover", () => {
        clearInterval(intervalID);
        backwardFrame();
        intervalID = setInterval(backwardFrame, 1000);
    });
    leftButton.addEventListener("mouseleave", () => {
        autoAdvance();
    })

    const rightButton = document.createElement("div");
    rightButton.classList.add("button-area");
    rightButton.addEventListener("mouseover", () => {
        clearInterval(intervalID);
        forwardFrame();
        intervalID = setInterval(forwardFrame, 1000);
    });
    rightButton.addEventListener("mouseleave", () => {
        autoAdvance();
    })

    const selectBox = document.createElement("div");
    selectBox.classList.add("select-box");
    for (let j = 0; j < images.length; j++) {
        const selectDot = document.createElement("span");
        selectDot.textContent = "\u2022";
        selectBox.appendChild(selectDot);
        selectDot.addEventListener("click", () => {
            clearInterval(intervalID);
            document.documentElement.style.setProperty("--transition-timer", "0.05s");
            intervalID = setInterval(() => {
                forwardFrame();
                if (imageIndex === j) {
                    clearInterval(intervalID);
                    intervalID = setTimeout(() => {
                        document.documentElement.style.setProperty("--transition-timer", "1s");
                        autoAdvance();
                    }, 100);                
                }
            }, 50);
        })
    }


    controlBox.append(leftButton, slider, rightButton, selectBox);

    const backwardFrame = () => {
        imageIndex--;
        checkIndex();
        const imgFrame = document.createElement("div");
        imgFrame.classList.add("slider-frame");

        const newImg = document.createElement("img");
        newImg.classList.add("slider-image");
        imgFrame.appendChild(newImg);

        backwardIndex = imageIndex - 3;
        if (backwardIndex < 0) {
            backwardIndex += images.length;
        }
        newImg.src = `./pics/${images[backwardIndex]}`;

        slider.prepend(imgFrame);
        if (slider.childNodes.length > 7) {
            slider.lastChild.remove();
        }
        updateSelectDot();
    }

    const forwardFrame = () => {
        imageIndex++;
        checkIndex();
        const imgFrame = document.createElement("div");
        imgFrame.classList.add("slider-frame");

        const newImg = document.createElement("img");
        newImg.classList.add("slider-image");
        imgFrame.appendChild(newImg);

        forwardIndex = imageIndex + 3;
        if (forwardIndex >= images.length) {
            forwardIndex -= images.length;
        }
        newImg.src = `./pics/${images[forwardIndex]}`;

        slider.appendChild(imgFrame);
        if (slider.childNodes.length > 7) {
            slider.firstChild.remove();
        }
        updateSelectDot();
    }

    const updateSelectDot = () => {
        selectBox.childNodes.forEach(element => element.classList.remove("highlighted"));
        selectBox.childNodes[imageIndex].classList.add("highlighted");
    }

    const loadSeven = () => {
        for (let x = 0; x < 7; x++) {
            forwardFrame();
        }
    }

    const autoAdvance = () => {
        clearInterval(intervalID);
        intervalID = setInterval(() => {
            forwardFrame();
        }, 2500);    
    }

    const preloadImages = () => {
        images.forEach(image => {
            let img = new Image();
            img.src = `./pics/${image}`;
        })
    }

    preloadImages();
    loadSeven();
    autoAdvance();

}

makeImageSlider();