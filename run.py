import subprocess
import ctypes

# Función para ejecutar un comando en una terminal como administrador
def run_command_as_admin(command):
    try:
        # Creamos un objeto de la estructura de datos de entrada para la función de elevación
        cmd_info = subprocess.STARTUPINFO()
        cmd_info.dwFlags |= subprocess.STARTF_USESHOWWINDOW
        cmd_info.wShowWindow = ctypes.windll.user32.SW_HIDE

        # Creamos el objeto de proceso para el comando elevado
        process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, stdin=subprocess.PIPE, startupinfo=cmd_info)

        # Esperamos a que el proceso se complete y devolvemos el resultado
        output, error = process.communicate()
        return output.strip(), error.strip()
    except:
        return None, None

# Ejecutamos los comandos en terminales separadas como administrador
run_command_as_admin('start cmd /c "npm run dev"')
run_command_as_admin('start cmd /c "pocketbase serve"')
