import { get } from 'svelte/store';
import { projectStore } from '../stores/project.js';
import { canvasObjects } from '../stores/objects.js';
import { tools } from '../constants/toolsList.js';


// function to select which canvas tool has been clicked in the toolbar
function changeTool(buttonPressed) {

    projectStore.changeCanvasTool(buttonPressed);

    //change the cursor icon depending on the current tool
    let canvasElement = get(projectStore).canvasElement;
    switch(buttonPressed) {
        case(tools.LINE):
        case(tools.RECTANGLE):
            deselectAnySelectedObjects()
            canvasElement.style.cursor = "crosshair";
            projectStore.turnOffSquareHighlighting();
            break;
        case(tools.TEXT):
        case(tools.PROGRESS):
            deselectAnySelectedObjects()
            canvasElement.style.cursor = "pointer";
            projectStore.turnOnSquareHighlighting();
            break;
        case(tools.DRAG):
            canvasElement.style.cursor = "pointer";
            projectStore.turnOffSquareHighlighting();
            break;
        default:
            canvasElement.style.cursor = "default"; 
    }
    toggleSideBarDisplay(buttonPressed);
}


// deselect any relevant objects if clicked off the select tool
function deselectAnySelectedObjects() {
    let canvasItems = get(canvasObjects);

    canvasItems.forEach(object => {
        if (object.selected) {
            object.deselectObject();
        }
    });
}

function toggleSideBarDisplay(tool) {
    let showEdit = get(projectStore).showEditOptions;
    let showText  = get(projectStore).showTextOptions;
    let showProgress= get(projectStore).showProgressOptions;
    switch(tool) {
        case(tools.LINE):
        case(tools.RECTANGLE):
            if (showText === true) {
                projectStore.toggleTextMenu();
            }
            if (showProgress === true) {
                projectStore.toggleProgressMenu();
            }
            break;
        case(tools.TEXT):
            if (showText === false) {
                projectStore.toggleTextMenu();
            }
            if (showProgress === true) {
                projectStore.toggleProgressMenu();
            }
            break;
        case(tools.PROGRESS):
            if (showText === true) {
                projectStore.toggleTextMenu();
            }
            if (showProgress === false) {
                projectStore.toggleProgressMenu();
            }
            break;
        case(tools.DRAG):
            if (showEdit === false) {
                projectStore.toggleEditMenu();
            }
            if (showText === true) {
                projectStore.toggleTextMenu();
            }
            if (showProgress === true) {
                projectStore.toggleProgressMenu();
            }
            break;
    }
}

function buttonCurrentlyPressed(toolSelected) {
    switch(toolSelected) {
        case(tools.LINE):
            return 'line (l)';
        case(tools.RECTANGLE):
            return 'rectangle (r)';
        case(tools.TEXT):
            return 'text (t)';
        case(tools.PROGRESS):
            return 'progress bar (p)';
        case(tools.DRAG):
            return 'select (v)'
    }
}

export { changeTool, deselectAnySelectedObjects, buttonCurrentlyPressed }