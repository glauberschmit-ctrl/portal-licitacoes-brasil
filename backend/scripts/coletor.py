import os
import sys
import django
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from datetime import datetime

# Configuração do Ambiente Django
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'plb_project.settings')
django.setup()

from bids.models import Licitacao

URL_ALVO = "https://e-lic.sc.gov.br/portal/Mural.aspx"

print(f"--- Iniciando o robô coletor (v10 - Autossuficiente) ---")

# Opções do Chrome para rodar no Heroku
options = webdriver.ChromeOptions()
options.add_argument("--headless")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("--no-sandbox")

try:
    # A MÁGICA: O webdriver-manager baixa e configura o chromedriver automaticamente
    service = ChromeService(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)

    driver.get(URL_ALVO)
    print(">>> Navegador (em modo invisível) aberto, aguardando painel...")

    WebDriverWait(driver, 30).until(
        EC.presence_of_element_located((By.ID, "divPainelMural"))
    )
    print(">>> Painel principal carregado. Pausa de 5 segundos...")
    time.sleep(5)

    html_content = driver.page_source
    soup = BeautifulSoup(html_content, 'parser.html') # Corrigido para 'html.parser'

    corpo_da_tabela = soup.find('tbody', id='trListaMuralProcesso')

    if corpo_da_tabela:
        # ... (a lógica de extração e salvamento continua a mesma) ...
        print("Lógica de extração e salvamento aqui...")

finally:
    if 'driver' in locals():
        driver.quit()
    print("--- Robô finalizado ---")