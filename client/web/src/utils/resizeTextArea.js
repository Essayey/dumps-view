export const resizeTextArea = ref => {
    ref.current.style = 'height: auto';
    ref.current.style = 'height:' + (ref.current.scrollHeight) + 'px';
}