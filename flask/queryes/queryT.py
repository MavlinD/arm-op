#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# import pyodbc
from sqlalchemy import create_engine
from queryes.controller import Controller
from datetime import datetime, date, time, timedelta

# from flask import jsonify
# from stringcolor import *

pink = 'DeepPink3'


class Subquery:
    def __init__(self, arg):
        self.name = arg['name']
        self.aliases = arg['aliases']
        self.ID = arg['ID']
        self.tpoints = arg['tpoints']
        self.commSQL = ",(select count([TestResultId]) from v_Azot_TestResultACOY_YK_SPP ARTAS " \
                       "Where [КодГруппаТочкиКонтроля]={!r} " \
                       "and ([ОргструктураПуть] like '%'+AO.SPP+'%') and ".format(self.ID)

        self.sqlstr = [

            "([ДатаОтбора]>=convert(datetime, '{0[current]}', 21)) and ([ДатаОтбора]<CURRENT_TIMESTAMP)) as {2}{1[0]}",

            "[ВыходЗаНорму]=1 and([ДатаОтбора]>=convert(datetime, '{0[current]}', 21)) and ([ДатаОтбора]<CURRENT_TIMESTAMP)) as {2}{1[1]}",

            "([ДатаОтбора]>=convert(datetime, '{0[prev]}', 21)) and ([ДатаОтбора]<convert(datetime, '{0[current]}', 21))) as {2}{1[2]}",

            "[ВыходЗаНорму]=1 and([ДатаОтбора]>=convert(datetime, '{0[prev]}', 21)) and ([ДатаОтбора]<convert(datetime, '{0[current]}', 21))) as {2}{1[3]}",
            # "",
        ]
        self.totalSQL = ''

    def get_sql(self):
        for str in self.sqlstr:
            self.totalSQL += self.commSQL + str.format(self.tpoints, self.aliases, self.name)
        return self.totalSQL  #


class Connect(Controller):

    def __init__(self, data=''):
        super().__init__()
        if not data:
            print('class need some data: type: dict')
            return
        try:

            self.host = data['host']
            self.user = data['user']
            self.password = data['password']
            self.database = data['database']

        # self.cnxn = pyodbc.connect(
        #     'DRIVER={ODBC Driver 17 for SQL Server};SERVER=' + self.host +
        #     ';DATABASE=' + self.database + ';UID=' + self.user + ';PWD=' + self.password)
        # self.cursor = self.cnxn.cursor()

        except Exception as e:

            print("arg {} not setup".format(e))
            return

        # print('\n')
        # for key in data:
        #     # print("%s=%s" % (key, data[key]))
        #     print("{} is {}".format(key, data[key]))

    def get_resp(self, sql):
        # https://docs.sqlalchemy.org/en/13/core/engines.html
        resp = []

        self.engine = create_engine(
            'mssql+pyodbc://' + self.user + ':' + self.password + '@' + self.host +
            '/' + self.database + "?driver"
                                  "=ODBC "
                                  "Driver 17 "
                                  "for SQL "
                                  "Server")

        with self.engine.connect() as con:
            try:
                rs = con.execute(sql)
                for row in rs:
                    whole_row = [r[1] for r in row.items()]
                    resp += [whole_row]
                self.set_response('code', 0)
                self.set_response('data', resp)
                # print(cs(self.response, 'magenta'))

            except Exception as e:
                    # print(e)
                    self.set_response('code', 1)
                    self.set_response('data', e.args)


class Query(Connect):

    # https://docs.sqlalchemy.org/en/13/core/connections.html
    def __init__(self, data):
        super().__init__(data)
        self.dt_format = "%Y-%m-%d %H:%M:%S"
        self.smalldatetime_format = "%d.%m.%Y %H:%M:%S"

    def get_prv(self):
        sql = "SELECT [GRUZ],[ROD_VAG],[KOL_VO],[PL_1],[PL_D_1],[PL_2],[PL_D_2],[PL_ALL],[PL_D_ALL] " \
              "FROM ASUST_Obespechenie"
        return super().get_resp(sql)

    def get_ssp(self):
        sql = "SELECT [GRUZ],[ROD_VAG],[PLAN_POGR],[FACT_POGR],[F_POGR1],[F_POGR2],[F_POGR3],[F_POD_OST1]," \
              "[F_POD_POGR],[F_POD_OST2],[OTKL_POGR],[VIPOL_POGR] FROM ASUST_SSP"
        return super().get_resp(sql)

    def get_raw(self):
        sql = "SELECT DOR_DISL 'Дорога', DISL 'Дислокация', NAME_GR 'Груз', ROD_V 'Тип вагона', Count(NOMVAG) " \
              "'Вагонов', Sum(VES) 'Нетто' FROM ASUST_Podhod Where PRGR = 2 Group by DOR_DISL, DISL, " \
              "NAME_GR, ROD_V Order by DOR_DISL, DISL, NAME_GR, ROD_V "
        return super().get_resp(sql)

    def get_plan_factory(self):
        sql = "SELECT ROD_VAG 'Тип вагона',GRUZ 'Груз',PLAN_PPR 'ППР план',FACT_PPR 'ППР факт' FROM ASUST_PPR  Where " \
              "ROD_VAG <> '' Order By ROD_VAG, GRUZ "
        return super().get_resp(sql)

    def get_ntr(self):
        sql = "SELECT TOP 3 P_Id, P_Desc, V_Norm, V_Desc, P_Start, P_End FROM TP_Current Where Ws_id = 'MA1' And " \
              "P_Type = 'N' Order By P_Start desc "
        return super().get_resp(sql)

    def get_gruz(self):
        sql = "SELECT TOP 32 [CURR_GRUZ], COUNT([CURR_GRUZ]) AS CNTG FROM ASUST_Ostatok_Parka WHERE [CURR_GRUZ] IS " \
              "NOT NULL AND [SOST_VAG] = 'Груженый' GROUP BY [CURR_GRUZ] "
        return super().get_resp(sql)

    def get_empty_cargo(self):
        sql = "SELECT DOR_DISL 'Дорога', DISL 'Дислокация', NAME_GR 'Груз', ROD_V 'Тип вагона', Count(NOMVAG) " \
              "'Вагонов' FROM ASUST_Podhod Where PRGR = 1 Group by DOR_DISL, DISL, NAME_GR, " \
              "ROD_V Order by DOR_DISL, DISL, NAME_GR, ROD_V "
        return super().get_resp(sql)

    def get_bsp(self):
        sql = "SELECT CURR_GRUZ Gruz,(Select COUNT(NOMVAG) FROM [ControlData].[dbo].[ASUST_Ostatok_Parka] o2 Where " \
              "o2.CURR_GRUZ = o.CURR_GRUZ And o2.GODN_POGR = 'В ожидании выгрузки') Vagonov,(Select SUM(PROSTOY) FROM " \
              "[ControlData].[dbo].[ASUST_Ostatok_Parka] o2 Where o2.CURR_GRUZ = o.CURR_GRUZ And o2.GODN_POGR = 'В " \
              "ожидании выгрузки') Prostoy,(Select COUNT(NOMVAG) FROM [ControlData].[dbo].[ASUST_Ostatok_Parka] o2 " \
              "Where o2.CURR_GRUZ = o.CURR_GRUZ And o2.GODN_POGR = 'Поданы под выгрузку') Vagonov2,(Select SUM(" \
              "PROSTOY) FROM [ControlData].[dbo].[ASUST_Ostatok_Parka] o2 Where o2.CURR_GRUZ = o.CURR_GRUZ And " \
              "o2.GODN_POGR = 'Поданы под выгрузку') Prostoy2 FROM [ControlData].[dbo].[ASUST_Ostatok_Parka] o Where " \
              "o.CURR_GRUZ_CODE in (001142,731151,488250,001097,001098,711035,487169,001132,001142,731151,488250," \
              "303247,721484,481266,482146,482131,003009) And o.prib_netto > 0 Group By CURR_GRUZ Having (Select " \
              "COUNT(NOMVAG) FROM [ControlData].[dbo].[ASUST_Ostatok_Parka] o2 Where o2.CURR_GRUZ = o.CURR_GRUZ And " \
              "o2.GODN_POGR = 'В ожидании выгрузки') > 0 or (Select COUNT(NOMVAG) FROM [ControlData].[dbo].[" \
              "ASUST_Ostatok_Parka] o2 Where o2.CURR_GRUZ = o.CURR_GRUZ And o2.GODN_POGR = 'Поданы под выгрузку') > 0 "
        return super().get_resp(sql)

    def get_lntr(self, test='now'):
        sql = "SELECT TOP 3 P_Id, P_Desc, V_Norm, V_Desc, P_Start, P_End FROM TP_Current Where Ws_id " \
              "= 'MA1' And P_Type = 'N' Order By P_Start desc"
        return super().get_resp(sql)

    def get_osp(self):
        sql = "select * from [ControlData].[dbo].[ASUST_PCV]"
        return super().get_resp(sql)

    def get_snc(self):
        sql = "select * from [ControlData].[dbo].[ASUST_SNV]"
        return super().get_resp(sql)

    def get_broken_request(self):
        sql = "SELECT * FROM FakeTable"
        return super().get_resp(sql)

    def set_var(self, date):

        WORK_SHIFT = 12  # длительность смены

        target_date = datetime.now()

        def start_work():
            if target_date.hour >= 8 & target_date.hour < 20:
                return 8
            else:
                return 20

        work_shift = {
            'current': start_work(),  # начало текущей смены
            'prev': datetime(target_date.year, target_date.month, target_date.day, start_work(), 0) - timedelta(
                hours=WORK_SHIFT)
            # начало предыдущей
        }

        self.tpoints = {
            'current': target_date.strftime("%Y-%m-%d {current}:00:00").format(**work_shift),
            'prev': self.format_tpoints(work_shift['prev'])
        }

    def format_tpoints(self, date=datetime.now(), format=None):
        if not format:
            format = self.dt_format
        return date.strftime(format)

    def get_org_unit_asou(self, date='now'):

        aliases = [
            'CountTekSmen',
            'CountNormTekSmen',
            'CountPredSmen',
            'CountNormPredSmen',
        ]

        subquery = {
            'VsVhod': {
                'id': '37503B70-FDE0-41D5-BB2E-299500AD3F6D',
            },
            'VnVhod': {
                'id': '80B7CC64-F77C-42D9-A161-0835B581EB7C',
            },
            'Operac': {
                'id': '60DE2BDA-5EC7-4021-A880-75BEEBBCB37E',
            },
            'Exit': {
                'id': '2B32B8B4-68E9-4FFD-9417-2A926EFCBDCE',
            },
            'Product': {
                'id': '18BE9309-449D-479F-B7E7-85CD4D3F8342',
            },
            'Water': {
                'id': 'A45BDC32-46A1-48C7-963B-C2B7C14FF3E5',
            },
            'Air': {
                'id': '603440B6-B0E2-444D-93CE-E69E4CA482E3',
            },
            'PRO': {
                'id': 'BAE6C9D9-A7DB-4BBD-B44A-6854D5796AE5',
            },
            'VOC': {
                'id': 'F91669F3-D181-4551-A716-C24ECE7D0E2B',
            },
            # '': {
            #     'id': '',
            # },
        }

        # print('\n')
        # print(cs('=' * 50 + '\n', 'green'))

        self.database = 'I-LDS Azot'

        USE = 'select [SPP] '
        subSQL = ''
        FROM = ' from v_Azot_OrgUnitForACOY AO '
        WHERE = " where [SPP] not like 'ошибка' "
        GROUP = ' group by [SPP],[nomORG] '
        ORDER = ' order by [nomORG] '

        self.set_var(date)

        for el in subquery:
            # print(cs(el + subquery[el]['id'], pink))
            subSQL += Subquery({
                'name': el,
                'aliases': aliases,
                'ID': subquery[el]['id'],
                'tpoints': self.tpoints
            }).get_sql()

        SQL = USE + subSQL + FROM + WHERE + GROUP + ORDER
        # print(cs(SQL, 'green'))

        return super().get_resp(SQL)

    def get_analytical_control(self):

        self.database = 'I-LDS Azot'

        now = datetime.now()

        boundares={
            'left': self.format_tpoints(datetime.now(),self.smalldatetime_format),
            'right': self.format_tpoints(datetime(now.year, now.month, now.day - 1, 8, 0), self.smalldatetime_format)
        }

              # "r.[Точное значение _число] as SourceValue," \
              # "r.TRIsOutOfNorm," \
              # "r.OUSNameL0," \
              # "r.CPName," \
              # "r.OUSNameL3," \
              # "r.ProductName, " \
              # "r.SCode, " \
              # "r.SReceiveDate, " \
              # "r.SUser, " \
              # "r.SPExtractionPoint," \
              # "r.SCreationDate, " \
        sql = "select " \
                "r.OUSNameL1," \
                "r.OUSNameL2," \
                "r.CPreportname, " \
                "r.TSTTestName, " \
                "r.STTEngUnit," \
                "r.TRNorm, " \
                "r.[Отчетное значение _число] as FormattedValue, " \
                "r.SRegistrationDate, " \
                "r.CommSubdivision, " \
                "r.TestResultId " \
              "from [I-LDS Azot].[dbo].[v_Azot_TestResultSPP_po_YK] r " \
              "where SRegistrationDate < '{0[left]}' and SRegistrationDate >= '{0[right]}' and TRIsOutOfNorm = 1 " \
              "order by " \
              "SRegistrationDate, " \
              "OUSNameL0, " \
              "OUSNameL1, " \
              "OUSNameL2," \
              "OUSNameL3," \
              "CPName, " \
              "ProductName, " \
              "TSTTestName".format(boundares)

        # print(cs(sql, pink))
        return super().get_resp(sql)
