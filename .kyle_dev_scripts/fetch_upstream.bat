:: 关闭回显
@echo off
:: 防止中文乱码
chcp 65001

title 同步上游最新代码

git fetch -v upstream

pause