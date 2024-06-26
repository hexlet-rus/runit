import { useTranslation } from 'react-i18next';

function LicenseAgreement() {
  const { t: tLA } = useTranslation('translation', { keyPrefix: 'licAgr' });

  return (
    <div className="container-fluid py-5 m-0">
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-9">
            <div className="mb-4">
              <h2>{tLA('h2_1')}</h2>
            </div>
            <div className="mb-5 text-end">
              <div className="mb-1">{tLA('city')}</div>
              <div className="fw-bold">{tLA('date')}</div>
            </div>
            <p>{tLA('p1')}</p>
            <p>{tLA('p2')}</p> <br />
            <h2>{tLA('h2_2')}</h2>
            <p>{tLA('p3')}</p> <br />
            <h3>{tLA('h31')}</h3>
            <p>
              {tLA('p4_1')} <br />
              {tLA('p4_2')} <br />
              {tLA('p4_3')} <br />
              {tLA('p4_4')} <br />
              {tLA('p4_5')}
            </p>
            <br />
            <p>{tLA('p5')}</p> <br />
            <h2>{tLA('h2_3')}</h2>
            <h3>{tLA('h32')}</h3>
            <p>{tLA('p6')}</p>
            <p>{tLA('p7')}</p>
            <p>
              {tLA('p8_1')} <br />
              {tLA('p8_2')}
            </p>
            <br />
            <p>{tLA('p9')}</p> <br />
            <h3>{tLA('h33')}</h3>
            <p>
              {tLA('p10_1')} <br />
              {tLA('p10_2')} <br />
              {tLA('p10_3')} <br />
              {tLA('p10_4')}
            </p>
            <br />
            <h3>{tLA('h34')}</h3>
            <p>{tLA('p11')}</p>
            <p>{tLA('p12')}</p> <br />
            <h3>{tLA('h35')}</h3>
            <p>{tLA('p13')}</p>
            <p>{tLA('p14')}</p> <br />
            <h3>{tLA('h36')}</h3>
            <p>{tLA('p15')}</p>
            <p>{tLA('p16')}</p> <br />
            <h3>{tLA('h37')}</h3>
            <p>{tLA('p17')}</p>
            <p>{tLA('p18')}</p>
            <p>{tLA('p19')}</p>
            <p>
              {tLA('p20_1')} <br />
              {tLA('p20_2')}
            </p>
            <br />
            <p>{tLA('p21')}</p>
            <p>{tLA('p22')}</p> <br />
            <h3>{tLA('h38')}</h3>
            <p>{tLA('p23')}</p>
            <p>{tLA('p24')}</p>
            <p>{tLA('p25')}</p>
            <p>{tLA('p26')}</p>
            <p>{tLA('p27')}</p>
            <p>{tLA('p28')}</p>
            <p>
              {tLA('p29_1')} <br />
              {tLA('p29_2')} <br />
              {tLA('p29_3')} <br />
              {tLA('p29_4')}
            </p>
            <br />
            <p>{tLA('p30')}</p> <br />
            <h3>{tLA('h39')}</h3>
            <p>{tLA('p31')}</p> <br />
            <p>
              {tLA('p32_1')} <br />
              {tLA('p32_2')}
            </p>
            <br />
            <p>{tLA('p33')}</p>
            <p>{tLA('p34')}</p>
            <p>{tLA('p35')}</p>
            <p>{tLA('p36')}</p>
            <p>{tLA('p37')}</p>
            <p>{tLA('p38')}</p>
            <p>{tLA('p39')}</p>
            <p>{tLA('p40')}</p> <br />
            <h3>{tLA('h310')}</h3>
            <p>
              {tLA('p41_1')} <br />
              {tLA('p41_2')} <br />
              {tLA('p41_3')} <br />
              {tLA('p41_4')} <br />
            </p>
            <br />
            <h3>{tLA('h311')}</h3>
            <p>{tLA('p42')}</p> <br />
            <h3>{tLA('h312')}</h3>
            <p>
              {tLA('p43_1')} <br />
              {tLA('p43_2')}
            </p>
            <br />
            <h3>{tLA('h313')}</h3>
            <p>{tLA('p44')}</p>
            <p>{tLA('p45')}</p>
            <p>{tLA('p46')}</p>
            <p>{tLA('p47')}</p>
            <p>{tLA('p48')}</p>
            <p>{tLA('p49')}</p>
            <p>{tLA('p50')}</p>
            <p>{tLA('p51')}</p>
            <br />
            <h3>{tLA('h314')}</h3>
            <p>{tLA('p52')}</p>
            <br />
            <h3>{tLA('h315')}</h3>
            <p>{tLA('p53')}</p>
            <p>{tLA('p54')}</p>
            <br />
            <h3>{tLA('h316')}</h3>
            <p>
              {tLA('p55_1')} <br />
              {tLA('p55_2')} <br />
            </p>
            <p>{tLA('p56')}</p>
            <p>{tLA('p57')}</p>
            <br />
            <h3>{tLA('h317')}</h3>
            <p>{tLA('p58')}</p>
            <br />
            <h3>{tLA('h318')}</h3>
            <p>{tLA('p59')}</p>
            <br />
            <h3>{tLA('h319')}</h3>
            <p>{tLA('p60')}</p>
            <br />
            <h2>{tLA('h2_4')}</h2>
            <h3>{tLA('h320')}</h3>
            <p>{tLA('p61')}</p>
            <p>{tLA('p62')}</p>
            <p>{tLA('p63')}</p>
            <p>{tLA('p64')}</p>
            <p>{tLA('p65')}</p>
            <p>
              {tLA('p66_1')} <br />
              {tLA('p66_2')} <br />
            </p>
            <p>{tLA('p67')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LicenseAgreement;
