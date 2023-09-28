import { JWT } from 'google-auth-library'
import { GoogleSpreadsheet } from 'google-spreadsheet';
import dotenv from 'dotenv';
import { QuizeSendData } from '../types/appT';

dotenv.config();

const SCOPES = [
'https://www.googleapis.com/auth/spreadsheets',
'https://www.googleapis.com/auth/drive.file',
];

const gemail = process.env.GEMAIL || '';
const gkey = process.env.GKEY || '';

export async function gdoc(idrow: string, d: QuizeSendData) {
    try {
        
        const jwt = new JWT({
        email: gemail,
        key: gkey,
        scopes: SCOPES,
        });
        const doc = new GoogleSpreadsheet('1QuUQQk5AiUkpRAMgItah3itAs2N6eoy3GVK5iPiRppk', jwt);
        
        await doc.loadInfo();
        const sheet = doc.sheetsByTitle['Квиз от Славяна'];

        const arrWg = d.width_gates.split('/');
        const arrWsg = d.width_second_gates.split('/');
        const [wg, wsg] = formatGates(arrWg, arrWsg);

        await sheet.addRow({ 
            dbrow_id: idrow,
            clients_id: d.clients_id || '',
            isFrom: d.isFrom || d.is_from || '',
            name: d.name,
            email: '',
            phone: d.phone,
            color_fence_block: d.color_fence_block,
            var_comp_coll: d.var_comp_coll,
            fill_between_coll: d.var_comp_coll,
            isAutomatic: d.isAutomatic,
            isMount: d.isMount,
            height_fence: d.height_fence,
            total_lenght_fence: d.total_lenght_fence,
            lenght_between_colls: d.lenght_between_colls,
            how_many_wickets: d.how_many_wickets,
            width_wicket: wg, 
            width_second_wicket: wsg,
            how_many_gates: d.how_many_gates,
            width_gates: d.width_gates,
            width_second_gates: d.width_second_gates,
            telegram: d.telegram || '',
            city: d.city,
            date: d.date || '',
            country: ''
        });
    } catch (e) { console.log('err gdoc()');return}
    
      
}

function formatGates(wg: string[], wsg: string[]): string[] {
    // откатные: 0/распашные: 4,5
    const awg = wg.map(v => {
        return (parseFloat(v) > 0) ? v : null;
    })
    .filter(fv => {
        return (fv) ? fv : null;
    });
    const awsg = wsg.map(w => {
        return (parseFloat(w) > 0) ? w : null;
    }) .filter(fw => {
        return (fw) ? fw : null;
    });
    console.log(awg, awsg)
    return [awg.join(' '), awsg.join(' ')]
}
