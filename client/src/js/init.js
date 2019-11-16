// log version
console.log("nightTab version", version.get().number, version.get().name);
(async () => {
    await data.init();
    await state.init();
    await bookmarks.init();
    theme.init();
    menu.init();
    link.init();
    control.init();
    greeting.init();
    transitional.init();
    date.init();
    clock.init();
    keyboard.init();
    layout.init();
    background.init();
    search.init();
    header.init();
    modal.init();
    shade.init();
    dropdown.init();
    version.init();
  })();
