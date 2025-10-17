import os
import sys
import django
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from datetime import datetime

# --- CONFIGURAÇÃO DO AMBIENTE DJANGO ---
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'plb_project.settings')
django.setup()

# Agora podemos importar nossos modelos do Django
from bids.models import Licitacao

# --- O RESTO DO SCRIPT CONTINUA AQUI ---

CHROME_DRIVER_PATH = '.\\scripts\\chromedriver.exe'
URL_ALVO = "https://e-lic.sc.gov.br/portal/Mural.aspx"

print(f"--- Iniciando o robô coletor (v9 - Corrigido) ---")

service = Service(executable_path=CHROME_DRIVER_PATH)
options = webdriver.ChromeOptions()
options.add_argument("--start-maximized")
# options.add_argument("--headless") 
driver = webdriver.Chrome(service=service, options=options)

try:
    driver.get(URL_ALVO)
    print(">>> Navegador aberto, aguardando painel principal...")

    WebDriverWait(driver, 30).until(
        EC.presence_of_element_located((By.ID, "divPainelMural"))
    )
    print(">>> Painel principal carregado. Pausa de 5 segundos...")
    time.sleep(5)

    html_content = driver.page_source
    soup = BeautifulSoup(html_content, 'html.parser')

    corpo_da_tabela = soup.find('tbody', id='trListaMuralProcesso')

    if corpo_da_tabela:
        licitacoes_encontradas = corpo_da_tabela.find_all('tr')
        print(f">>> {len(licitacoes_encontradas)} licitações encontradas. Salvando no banco de dados...")
        
        contador_novas = 0
        for item in licitacoes_encontradas:
            colunas = item.find_all('td')
            if len(colunas) >= 5:
                numero_licitacao = colunas[1].get_text(strip=True) # Este é o valor que coletamos
                orgao = colunas[2].get_text(strip=True)
                objeto = colunas[3].get_text(strip=True)
                data_abertura_str = colunas[4].get_text(strip=True)

                # --- LÓGICA DE SALVAMENTO CORRIGIDA ---
                # 1. A CORREÇÃO ESTÁ AQUI: Usamos 'codigo_licitacao' para filtrar
                if not Licitacao.objects.filter(codigo_licitacao=numero_licitacao).exists():
                    
                    try:
                        data_abertura_obj = datetime.strptime(data_abertura_str, '%d/%m/%Y %H:%M')
                    except ValueError:
                        data_abertura_obj = None

                    # 2. A CORREÇÃO TAMBÉM ESTÁ AQUI: Usamos 'codigo_licitacao' para salvar
                    nova_licitacao = Licitacao(
                        titulo=f"{orgao} - {numero_licitacao}",
                        codigo_licitacao=numero_licitacao, # Corrigido!
                        orgao=orgao,
                        objeto=objeto,
                        data_abertura=data_abertura_obj,
                        estado='SC',
                        cidade='Não informado'
                    )
                    
                    nova_licitacao.save()
                    contador_novas += 1
                    print(f"    -> SALVO: {numero_licitacao}")

        print(f">>> Processo finalizado. {contador_novas} novas licitações foram salvas.")

finally:
    print("--- Fechando o navegador ---")
    driver.quit()
    print("--- Robô finalizado ---")