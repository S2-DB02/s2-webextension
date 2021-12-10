# BAS WORLD BUG REPORTER

![](https://img.shields.io/github/manifest-json/v/s2-db02/s2-webextension) ![](https://img.shields.io/github/issues/s2-db02/s2-webextension) ![](https://img.shields.io/github/last-commit/s2-db02/s2-webextension)


Bas World Bug reporter is a Chrome-based web-extension which is a part of the S2-DB02 project used for internal bug reporting within © Bas World. (See our [CMS Portal](https://github.com/S2-DB02/s2-laravel) here.)

This project is developed by S2 students at Fontys University of Applied Science and is mainly used as a school project.

## Installation


1. Download the zip file by cloning this project.
2. Extract this zip file in a convenient folder. (You can't delete this folder for as long as you want to use this extension. 
   After all, you can't load an extension that you have deleted.)
3. Open the folder and edit the "config.json" file. In there are a couple of lines which this extension uses to communicate to the Laravel application.
4. Change all base addresses to the address of your Laravel server, e.g.: 
> `http://localhost:8000/api/user/` becomes `http://192.168.1.3:8000/api/user/`
> Be aware, the base link can be a domain name as well, make sure to use the correct form.
6. Head to your webbrowser and open chrome://extensions in a new tab.
7. Enable "Developer mode" at the top-right of the page.
8. Click the "Load unpacked" button that just appeared.
9. Select the folder where you just extracted the zip.
10. Now your extension is ready to use. 


## Screenshots

<table><tr>
<td> <img src="https://imgur.com/rZtm604.png" alt="login" style="width: 250px;"/> </td>
<td> <img src="https://imgur.com/tVem7hw.png" alt="popup" style="width: 250px;"/> </td>
</tr></table>



## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
