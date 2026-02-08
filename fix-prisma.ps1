$clientPath = "C:\Users\sayed\Downloads\ideation-buddy\node_modules\.prisma\client"

# List any query engine files
if (Test-Path $clientPath) {
    Write-Host "Client dir exists. Files:"
    Get-ChildItem $clientPath -Recurse -Filter "query_engine*" | ForEach-Object { Write-Host "  $_" }
} else {
    Write-Host "Client dir does not exist"
}

# Kill any node processes
$procs = Get-Process -Name "node" -ErrorAction SilentlyContinue
if ($procs) {
    Write-Host "Killing $($procs.Count) node process(es)..."
    $procs | Stop-Process -Force
    Start-Sleep -Seconds 2
}

# Remove and recreate client dir
if (Test-Path $clientPath) {
    Remove-Item -Recurse -Force $clientPath
    Write-Host "Removed client dir"
}

Write-Host "Running prisma generate..."
Set-Location "C:\Users\sayed\Downloads\ideation-buddy"
& npx prisma generate 2>&1
Write-Host "Exit code: $LASTEXITCODE"
