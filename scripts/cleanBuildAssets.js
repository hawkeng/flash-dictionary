#!/usr/bin/env node
/**
 * This script removes unwanted assets (e.g. node_modules)
 * from the build after cordova's prepare process
 */

const shouldCleanAssets = true;
const shouldMoveBuildToRoot = true;

// Using www folder as root
const developmentFiles = [
    'public/',
    'src/',
    '.gitignore',
    'package.json',
    'yarn.lock',
    'node_modules/'
]

module.exports = function (ctx) {
    const fs = ctx.requireCordovaModule('fs');
    const path = ctx.requireCordovaModule('path');

    const rootDir = ctx.opts.projectRoot;

    if (rootDir) {
        const platforms = ctx.opts.cordova.platforms || [];

        try {
            platforms.forEach(platform => {
                platform = platform.trim().toLowerCase();

                if (platform === 'android') {
                    // Tasks
                    shouldCleanAssets && cleanAssets(platform);
                    shouldMoveBuildToRoot && moveBuildToRoot(platform);

                } else {
                    throw Error(`Platform not implemented: ${platform}`);
                }
            });
        } catch (e) {
            process.stdout.write(e);
        }
    }

    function cleanAssets(platform) {
        let fullPath;
        developmentFiles.forEach(asset => {
            fullPath = path.join('platforms', platform, 'assets', 'www', asset);

            if (fs.existsSync(fullPath)) {
                console.log(`Removing: ${fullPath}`);
                rm({ fs, path }, fullPath);
            } else {
                console.log(`Attempted to remove file but wasn't found: ${fullPath}`);
            }
        });
    }

    function moveBuildToRoot(platform) {
        const assetsDir = path.join('platforms', platform, 'assets', 'www');
        const buildDir = path.join(assetsDir, 'build');
        let oldPath, newPath;
        fs.readdirSync(buildDir).forEach(file => {
            oldPath = path.join(buildDir, file);
            newPath = path.join(assetsDir, file);
            console.log(`Moving file ${oldPath} to ${newPath}`);
            move({ fs, path }, oldPath, newPath);
        });
        fs.rmdirSync(buildDir);
    }
}

function rm({ fs, path }, filepath) {
    if (fs.lstatSync(filepath).isDirectory()) {

        let curPath;
        fs.readdirSync(filepath).forEach(file => {
            curPath = path.join(filepath, file);
            rm({ fs, path }, curPath);
        });
        fs.rmdirSync(filepath);
    } else {
        fs.unlinkSync(filepath);
    }
}

function move({ fs, path }, oldPath, newPath) {
    if (fs.lstatSync(oldPath).isDirectory()) {

        if (!fs.existsSync(newPath)) {
            fs.mkdirSync(newPath);
        }

        let curOldPath, curNewPath;
        fs.readdirSync(oldPath).forEach(file => {
            curOldPath = path.join(oldPath, file);
            curNewPath = path.join(newPath, file);
            move({ fs, path }, curOldPath, curNewPath);
        });
        fs.rmdirSync(oldPath);
    } else {
        fs.renameSync(oldPath, newPath);
    }
}
