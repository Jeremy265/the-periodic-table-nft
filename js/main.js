const imageFolderForTable = "./images/png/"
const imageExtensionForTable = ".png"

const getAtomByCoordinates = (x, y) => {
    return periodicTableData.find(atom =>
        x === atom.ypos && y === atom.xpos
    )
}

const getAtomByNumber = (number) => {
    return periodicTableData.find(atom =>
        number === atom.number
    )
}

const getMaxCoordinates = () => {
    const coordinates = {
        maxRow: 0,
        maxCol: 0
    }
    periodicTableData.forEach((element) => {
        if (coordinates.maxRow < element.ypos) {
            coordinates.maxRow = element.ypos
        }
        if (coordinates.maxCol < element.xpos) {
            coordinates.maxCol = element.xpos
        }
    })
    return coordinates
}

const getImageByAtom = (atom) => {
    const image = new Image()
    image.src = imageFolderForTable + atom.number + imageExtensionForTable
    image.alt = atom.name
    return image
}

const fillTable = () => {
    const maxCoordinates = getMaxCoordinates()
    const tbody = document.getElementById("periodicTable").querySelector("tbody")
    for (let i = 1; i <= maxCoordinates.maxRow; i++) {
        let row = tbody.insertRow()
        for (let j = 1; j <= maxCoordinates.maxCol; j++) {
            let cell = row.insertCell()
            const atom = getAtomByCoordinates(i, j)
            if (atom === undefined) {
                continue
            }
            const image = getImageByAtom(atom)
            const container = document.createElement('div');
            container.className = "image_container"
            container.append(image)
            if (atom.coming_soon) {
                const coming = new Image()
                coming.src = "./images/coming_soon.png"
                container.append(coming)
                image.className = "coming_soon"
                coming.className = "coming_soon_label"
            } else {
                image.className = "ready"
            }
            const link = document.createElement('a')
            link.href ='https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/' + atom.token_id;
            link.target = "_blank"
            if (!atom.coming_soon) {
                link.disabled = true
            }
            link.append(container)
            cell.append(link)
            cell.setAttribute("data-number", atom.number)
        }
    }
}

window.addEventListener('popstate', () => {
    if (Swal.isVisible()) {
        Swal.close();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    fillTable()
})
