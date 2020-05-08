export default function(data) {
    // pega a tag principal que irá receber o menu
    const tree = document.querySelector('nav#tree')

    // recebe toda a arvore de elementos
    const menu = document.createElement('ul')

    const firstLevel = data.filter(item => !item.parent)
    const getFirstLis = firstLevel.map(buildTree) // retorno novo array com li's
    getFirstLis.forEach( li => menu.append(li)) // adicionar li's ao menu


    function buildTree(item) {
        
        // primeiro elemento
        const li = document.createElement('li')
        li.innerHTML = item.name


        const children = data.filter(child => child.parent === item.id)

        if(children.length > 0) {

            //adiciona um click para os parents
            li.addEventListener('click', event => {
                event.stopPropagation()
                event.target.classList.toggle('open')
            })

            // adiciona uma classe identificadora de que tem filhos
            li.classList.add('has-children')

            // constroi os filhos
            const subMenu = document.createElement('ul')
            children.map(buildTree)
            .forEach(li => subMenu.append(li))
            li.append(subMenu)
        }
        
        // adicionar os elements ao menu
        return li
    }

    // adiciona o menu no HTML
    tree.append(menu)
}