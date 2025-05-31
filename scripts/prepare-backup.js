#!/usr/bin/env node

/**
 * Скрипт для подготовки бэкапа
 *
 * Использование:
 * node scripts/prepare-backup.js
 */

const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

// Настройки
const config = {
  backupDir: path.join(__dirname, "../backups"),
  date: new Date().toISOString().replace(/:/g, "-").split(".")[0],
  siteName: "neshkola",
  retention: 7, // количество сохраняемых копий
}

// Создаем директорию для бэкапов, если она не существует
if (!fs.existsSync(config.backupDir)) {
  fs.mkdirSync(config.backupDir, { recursive: true })
  console.log(`Created backup directory: ${config.backupDir}`)
}

// Имя файла бэкапа
const backupFile = path.join(config.backupDir, `${config.siteName}_${config.date}.tar.gz`)

try {
  // Создаем список файлов для бэкапа
  console.log("Preparing file list...")

  // Исключаем ненужные директории и файлы
  const excludes = ["node_modules", ".next", "backups", ".git", ".env", ".env.local"]
    .map((dir) => `--exclude="${dir}"`)
    .join(" ")

  // Создаем архив
  console.log("Creating backup archive...")
  execSync(`tar -czf "${backupFile}" ${excludes} .`, { stdio: "inherit" })

  // Удаляем старые бэкапы
  console.log("Cleaning up old backups...")
  const backups = fs
    .readdirSync(config.backupDir)
    .filter((file) => file.startsWith(`${config.siteName}_`) && file.endsWith(".tar.gz"))
    .map((file) => path.join(config.backupDir, file))
    .sort((a, b) => fs.statSync(b).mtime.getTime() - fs.statSync(a).mtime.getTime())

  // Удаляем старые бэкапы, оставляя только последние N
  if (backups.length > config.retention) {
    backups.slice(config.retention).forEach((file) => {
      fs.unlinkSync(file)
      console.log(`Deleted old backup: ${path.basename(file)}`)
    })
  }

  console.log(`Backup completed: ${backupFile}`)
  console.log(`Total backups: ${Math.min(backups.length, config.retention)}`)
} catch (error) {
  console.error("Backup failed:", error)
  process.exit(1)
}
