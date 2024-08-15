import { NAME } from '@/lib/globals'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Location } from '@/store/useLocationStore'

type BrandProps = {
  className?: string
  location?: Location
}

export default function Brand({ className, location }: BrandProps) {
  const getHref = () => {
    switch (location) {
      case Location.MYRTLE_BEACH:
        return '/house-cleaning-services-myrtle-beach'
      default:
        return '/'
    }
  }

  return (
    <Link
      href={getHref()}
      className={cn(
        'flex items-center justify-center font-serif text-xl font-thin text-gray-900 dark:text-white',
        className
      )}
    >
      <svg
        className='mr-2 h-10 w-10 text-primary-700 sm:h-12 sm:w-12'
        xmlns='http://www.w3.org/2000/svg'
        x='0px'
        y='0px'
        width='100%'
        viewBox='0 0 466 466'
        enableBackground='new 0 0 466 466'
      >
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M175.039612,336.213470
	C175.474350,336.173431 175.909073,336.133392 177.014465,336.367645
	C185.786209,335.820801 193.887329,334.999725 201.988434,334.178619
	C211.076508,331.787964 220.254807,329.689514 229.225952,326.920105
	C237.338303,324.415802 245.349854,321.476166 253.173752,318.177917
	C260.474731,315.100159 267.749786,311.766602 274.541748,307.716400
	C288.411133,299.445862 301.768951,290.314026 315.678101,282.114838
	C327.113159,275.374084 338.576965,268.234924 350.903870,263.603394
	C359.888031,260.227783 370.180084,261.096558 380.198456,261.646149
	C391.438538,262.262695 401.461578,265.812347 411.170410,270.290894
	C422.993347,275.744659 432.481995,284.538086 440.056152,295.231506
	C440.329193,295.617035 440.358826,296.174988 440.566437,296.867950
	C429.460236,294.837921 418.465363,292.828247 406.937561,290.185852
	C398.973022,289.391052 391.541595,289.180664 384.109375,289.145569
	C383.405304,289.142242 382.696045,290.238403 381.989197,290.824158
	C376.011169,291.583740 370.033173,292.343292 364.055145,293.102875
	C363.994751,293.757690 363.934326,294.412476 363.873932,295.067291
	C397.109955,293.256805 427.347260,299.762024 450.944122,325.839844
	C451.336945,326.645203 451.554413,326.878967 451.826172,327.062195
	C452.015259,327.351257 452.204376,327.640289 452.686523,328.371216
	C453.700378,329.531708 454.421234,330.250275 455.142090,330.968872
	C455.448914,331.040375 455.689606,331.207245 455.965881,331.987915
	C456.405975,332.993713 456.744415,333.481079 457.082855,333.968445
	C457.082855,333.968445 457.001465,333.967346 456.984924,334.357758
	C456.229919,335.482941 455.574921,336.726135 454.738342,336.863464
	C451.324310,337.423889 447.860657,337.861115 444.404663,337.955933
	C428.846588,338.382843 413.285583,338.718048 397.724091,338.999969
	C391.256042,339.117157 384.779755,338.888031 378.316711,339.102905
	C376.525818,339.162445 374.769043,340.249359 372.782715,340.976990
	C372.268616,341.243988 372.054871,341.477936 371.927521,341.790894
	C359.895660,342.184357 347.863190,342.559296 335.832153,342.976471
	C323.309937,343.410645 310.789124,343.885590 297.893982,345.008728
	C298.925964,346.108551 300.326019,346.894989 301.738281,346.917603
	C309.513062,347.042267 317.290894,346.980225 325.067657,346.982239
	C332.095215,347.129395 339.122803,347.276550 346.824890,347.641235
	C358.913330,347.962952 370.327301,348.067108 381.741241,348.171234
	C383.266571,348.609344 384.791870,349.047485 387.364868,349.786530
	C382.721924,352.066223 378.741638,354.317230 374.541168,356.027466
	C361.926880,361.163330 349.346344,366.423981 336.523468,370.992767
	C325.592499,374.887451 314.429169,378.213745 303.205475,381.172577
	C296.137451,383.035797 288.774475,383.792755 281.533722,384.984802
	C272.402222,386.488129 263.263672,387.949585 254.120544,389.380554
	C252.175827,389.684937 250.202255,389.869965 248.235275,389.954987
	C242.461807,390.204498 236.684952,390.375946 230.236786,390.706299
	C229.359665,390.810486 229.155151,390.786377 228.605728,390.548889
	C220.527374,390.453827 212.793915,390.572205 204.725922,390.729370
	C204.171783,390.814728 203.952148,390.861298 203.732529,390.907867
	C202.478790,390.609863 201.239075,390.147949 199.969147,390.039246
	C187.526566,388.974304 174.919983,388.864441 162.677551,386.692902
	C150.476334,384.528656 138.561249,380.566132 126.668854,376.910156
	C118.500420,374.399017 110.307899,371.642700 102.623932,367.957947
	C92.097275,362.910004 81.676231,357.445099 71.881126,351.119537
	C60.416050,343.715515 49.205147,335.750397 38.766338,326.978638
	C30.666414,320.172211 23.797674,311.865234 16.662670,303.971252
	C14.915363,302.038086 14.267289,299.111389 12.568927,295.474670
	C14.637230,296.403351 15.854280,296.822144 16.943529,297.459442
	C24.554909,301.912537 31.858135,307.007690 39.798748,310.755981
	C51.963966,316.498505 64.335129,321.992218 77.053085,326.313721
	C86.278458,329.448456 96.201424,330.540619 105.823868,332.491577
	C109.946686,333.327515 114.096275,334.031464 118.901688,335.213867
	C121.482307,336.082581 123.384483,336.869568 125.309258,336.929413
	C139.641846,337.375092 153.978180,337.715851 168.315414,337.976196
	C170.217529,338.010712 172.131256,337.406464 174.231979,336.980652
	C174.690018,336.704071 174.895111,336.487457 175.039612,336.213470
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M352.070618,191.011703
	C351.874542,204.414474 362.617035,212.026398 368.636658,222.124207
	C370.621613,225.453918 373.282227,228.380875 376.740448,232.955933
	C370.322388,232.955933 365.151642,232.809647 359.993256,232.999329
	C355.341858,233.170364 350.777832,233.107468 346.898315,230.169754
	C341.999603,226.460266 337.260376,222.540985 332.408203,218.768997
	C320.448669,209.471863 308.554260,200.087357 296.461731,190.965942
	C286.074921,183.131195 275.380890,175.704651 264.957153,167.917679
	C258.930328,163.415375 253.194931,158.524582 247.275909,153.875427
	C245.045914,152.123871 242.667877,150.560822 239.200531,148.086243
	C203.738297,174.559158 167.502258,201.609726 130.363861,229.333908
	C142.597015,236.659302 143.895508,248.466553 142.664047,261.823914
	C142.738617,264.724487 139.215134,267.180481 142.870193,269.093597
	C142.870193,269.093597 142.973602,269.401794 142.882019,269.867096
	C142.750931,270.535736 142.711441,270.739105 142.223938,270.951477
	C108.512985,270.975464 75.250053,270.990997 41.987118,271.002563
	C40.990055,271.002899 39.773235,271.310303 39.048672,270.854645
	C38.024166,270.210388 36.713314,269.018860 36.665272,268.007111
	C36.502625,264.581970 37.144329,261.114227 36.932201,257.696686
	C36.346767,248.264923 36.669659,239.170441 43.951908,231.919434
	C43.951908,231.919434 43.984913,231.984879 44.175797,231.862244
	C44.572620,231.479034 44.778557,231.218445 44.984489,230.957870
	C44.984493,230.957870 44.999435,231.002151 45.366634,230.997116
	C48.483032,229.972824 51.232231,228.953583 53.981430,227.934341
	C53.981430,227.934341 53.993229,227.996170 54.177292,227.908005
	C54.625671,227.663422 54.838490,227.454529 54.999802,227.193146
	C56.090557,226.818283 57.181309,226.443436 58.891209,226.315277
	C61.030827,225.775345 62.551296,224.988724 64.071770,224.202118
	C64.071770,224.202118 64.481956,224.076965 65.072525,224.029709
	C72.933235,222.003403 74.988869,219.562317 75.953659,211.582642
	C75.963806,211.390884 76.108994,211.035370 76.346878,210.694595
	C76.721848,208.374634 76.977249,206.395538 76.978493,204.416260
	C77.001892,167.125244 76.923904,129.833893 77.081413,92.543533
	C77.102051,87.659973 78.298325,82.781372 78.950073,77.900475
	C84.930229,71.246025 91.717300,72.343040 97.934036,81.677200
	C97.822426,82.603607 97.795914,82.835480 97.552124,83.408127
	C97.224899,84.568527 97.019073,85.388100 97.018776,86.207756
	C97.003998,126.032501 96.997635,165.857269 97.045700,205.681961
	C97.047424,207.108734 97.606056,208.534805 98.037949,210.173737
	C98.435799,210.581696 98.700836,210.777145 98.965874,210.972595
	C99.774490,212.516098 100.583107,214.059631 101.684250,216.161530
	C103.361580,213.996445 104.902260,211.976761 106.475220,209.982529
	C115.203636,198.916367 123.959320,187.871658 132.667847,176.789902
	C140.856705,166.369461 148.965164,155.885712 157.183167,145.488434
	C159.414841,142.664963 161.914719,140.053467 165.072159,137.202881
	C182.015182,137.039169 198.177780,137.052795 214.339600,136.947754
	C216.237473,136.935440 218.131104,136.270111 220.026703,135.907501
	C220.026703,135.907501 219.999619,135.997696 220.270264,135.970016
	C221.026733,135.605667 221.512543,135.269012 221.998367,134.932358
	C221.998367,134.932358 221.998398,134.994843 222.277435,134.979263
	C223.045258,134.630310 223.534058,134.296936 224.022858,133.963562
	C228.052444,130.339951 231.901840,126.482613 236.181580,123.183502
	C238.610641,121.311028 241.015594,122.661583 243.304626,124.659454
	C247.807114,128.589218 252.643845,132.136047 258.003418,136.234344
	C273.817902,136.757034 288.971222,136.886688 304.124573,137.016327
	C307.046722,140.248276 309.968842,143.480240 313.873505,147.798874
	C314.321014,144.831161 315.082031,142.522873 314.913605,140.284546
	C314.633392,136.560287 315.813568,134.624603 320.150269,134.433716
	C320.604675,134.119171 321.034363,134.185760 321.374695,134.412415
	C331.248566,134.718109 340.782104,134.797150 350.592987,134.820084
	C351.233887,134.833557 351.597473,134.903137 351.960876,135.443085
	C351.997314,154.279526 352.033966,172.645615 352.070618,191.011703
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M225.833603,300.163727
	C225.833603,300.163727 226.001953,300.450653 226.147369,300.943115
	C227.132111,301.796936 228.009537,302.536530 228.804413,302.456451
	C233.037933,302.029999 237.318192,301.694214 241.451340,300.752441
	C245.396988,299.853394 249.181946,298.249207 253.037567,296.954987
	C253.373581,295.550537 253.709610,294.146088 254.331329,292.267944
	C254.857956,291.569153 255.034744,291.301666 255.382355,290.653137
	C255.738800,274.389099 255.880920,258.463806 255.923157,242.538223
	C255.925354,241.707962 255.076950,240.875458 254.493317,240.118118
	C254.362091,240.192245 254.082336,240.080002 254.082336,240.080002
	C252.949677,236.304062 253.098770,236.047684 257.610870,236.037216
	C272.441376,236.002823 287.272003,236.035492 302.864990,236.330017
	C304.406708,238.379868 305.833221,240.131729 305.861694,241.906036
	C306.065552,254.598083 305.984802,267.294708 305.994507,279.989868
	C305.994507,279.989868 306.000000,280.000275 305.809662,280.090149
	C305.384369,280.332001 305.192902,280.526764 305.044922,280.764282
	C296.225189,286.204590 287.614227,292.027130 278.532532,296.987915
	C267.317871,303.113831 255.862335,308.853180 244.235870,314.156708
	C230.596649,320.378418 216.052765,323.746429 201.258499,325.933319
	C193.508087,327.078979 185.716568,327.946594 177.148224,328.629517
	C167.895584,328.489197 159.438324,328.659088 150.981049,328.828979
	C143.331146,328.868561 135.637726,329.427094 128.044571,328.790161
	C121.491463,328.240448 115.058235,326.300995 108.561600,325.029144
	C99.788239,323.311523 90.971375,321.798828 82.238716,319.897217
	C77.180748,318.795837 72.231918,317.165771 67.284996,315.611237
	C66.532555,315.374786 66.057335,314.256165 65.274971,313.334900
	C74.269928,312.872528 82.817352,312.557770 91.345818,311.968567
	C108.685402,310.770569 126.015259,309.431244 143.347961,308.134521
	C147.776413,307.803253 152.199387,307.399353 156.626907,307.054626
	C161.370346,306.685242 166.116180,306.346313 171.611145,306.004578
	C172.582138,306.006287 172.802917,305.997498 173.283386,305.667297
	C173.693130,304.540558 173.973114,303.735413 173.974136,302.929901
	C173.999634,282.883240 174.012268,262.836548 173.957092,242.789993
	C173.953659,241.541473 173.377213,240.294540 173.051147,238.715820
	C173.062973,237.944870 173.091019,237.504944 173.580017,237.050171
	C188.989853,237.018005 203.940063,237.104294 218.886688,236.912308
	C222.740860,236.862808 224.111069,237.972626 224.067276,241.986694
	C223.877090,259.425110 223.953720,276.866913 224.031921,294.307037
	C224.040405,296.201904 224.685486,298.093903 225.232849,300.040527
	C225.430405,300.093811 225.833603,300.163727 225.833603,300.163727
M184.969147,283.006500
	C185.694794,281.521973 186.420441,280.037445 187.146088,278.552917
	C185.668854,277.885864 184.191620,277.218781 182.714386,276.551727
	C182.218155,277.026947 181.721924,277.502167 181.225708,277.977386
	C182.196701,279.665527 183.167709,281.353699 184.969147,283.006500
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M43.600304,231.962753
	C36.669659,239.170441 36.346767,248.264923 36.932201,257.696686
	C37.144329,261.114227 36.502625,264.581970 36.665272,268.007111
	C36.713314,269.018860 38.024166,270.210388 39.048672,270.854645
	C39.773235,271.310303 40.990055,271.002899 41.987118,271.002563
	C75.250053,270.990997 108.512985,270.975464 142.511261,271.079895
	C143.447739,271.255951 143.648880,271.312500 143.850021,271.369019
	C143.850021,271.369019 143.986481,271.512512 143.467346,271.674316
	C131.475464,271.898804 120.002609,272.030426 108.530014,272.009979
	C84.085945,271.966370 59.642017,271.843750 35.198032,271.753510
	C35.123413,262.655731 34.616512,253.532990 35.140350,244.469788
	C35.442501,239.242035 38.134186,234.591888 43.600304,231.962753
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M372.996613,340.864929
	C374.769043,340.249359 376.525818,339.162445 378.316711,339.102905
	C384.779755,338.888031 391.256042,339.117157 397.724091,338.999969
	C413.285583,338.718048 428.846588,338.382843 444.404663,337.955933
	C447.860657,337.861115 451.324310,337.423889 454.738342,336.863464
	C455.574921,336.726135 456.229919,335.482941 457.023926,334.345093
	C457.842010,335.258148 458.604584,336.574310 460.068573,339.101044
	C447.900726,339.426392 436.936859,339.719513 425.040009,339.988831
	C418.036499,339.966492 411.963440,339.867584 405.896759,340.020416
	C403.579559,340.078796 401.276886,340.713654 398.967590,341.085785
	C398.967590,341.085785 398.986908,340.990540 398.561157,340.979736
	C389.755829,340.934296 381.376221,340.899597 372.996613,340.864929
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M78.616119,77.959122
	C78.298325,82.781372 77.102051,87.659973 77.081413,92.543533
	C76.923904,129.833893 77.001892,167.125244 76.978493,204.416260
	C76.977249,206.395538 76.721848,208.374634 76.292038,210.225052
	C75.977135,167.056259 75.954948,124.016243 75.932770,80.976219
	C76.715904,79.990067 77.499039,79.003914 78.616119,77.959122
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M80.995026,289.325378
	C80.995102,285.483582 81.138901,282.092926 80.955757,278.720001
	C80.745018,274.838898 81.922691,273.379883 86.238380,275.808777
	C85.719559,285.093384 85.182266,294.708649 84.625458,304.673096
	C80.989006,302.586609 80.989006,302.586609 80.995026,289.325378
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M225.035294,299.987244
	C224.685486,298.093903 224.040405,296.201904 224.031921,294.307037
	C223.953720,276.866913 223.877090,259.425110 224.067276,241.986694
	C224.111069,237.972626 222.740860,236.862808 218.886688,236.912308
	C203.940063,237.104294 188.989853,237.018005 173.546509,236.825745
	C173.052032,236.616150 173.020432,236.164902 173.020432,236.164902
	C189.531647,236.103363 206.042862,236.020416 222.554031,236.031769
	C223.577164,236.032471 224.599762,236.774704 225.437103,237.866669
	C225.179489,259.036713 225.107391,279.511963 225.035294,299.987244
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M71.012909,289.031067
	C71.382393,283.815948 71.753990,279.081482 72.150032,274.035461
	C75.188492,274.366364 77.085609,274.568909 76.334129,278.654938
	C75.332359,284.101898 75.504784,289.755890 74.939011,295.297058
	C74.753487,297.114044 73.839272,298.856598 73.258293,300.633209
	C72.634193,300.616119 72.010094,300.599030 71.385994,300.581940
	C71.262337,296.891876 71.138687,293.201782 71.012909,289.031067
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M35.223282,272.213257
	C59.642017,271.843750 84.085945,271.966370 108.530014,272.009979
	C120.002609,272.030426 131.475464,271.898804 143.399597,271.746521
	C143.028290,272.101868 142.206253,272.934662 141.382843,272.936005
	C106.320992,272.993561 71.259026,272.977814 36.197075,272.957367
	C35.880840,272.957184 35.564713,272.771881 35.223282,272.213257
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M109.970627,285.338257
	C110.355644,290.380676 110.794289,294.951782 110.982391,299.533173
	C111.032074,300.743164 110.308876,301.984894 109.940567,303.212036
	C109.539368,303.127136 109.138168,303.042206 108.736969,302.957306
	C107.156471,293.487701 105.575974,284.018127 103.938339,274.206177
	C105.655548,274.112213 107.074944,274.034546 108.466454,273.958405
	C108.978775,277.776917 109.454651,281.323853 109.970627,285.338257
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M47.737488,274.990601
	C48.632790,275.549286 49.655647,276.343353 49.530636,276.621521
	C46.478939,283.411621 43.305149,290.146820 40.153259,296.891907
	C39.630558,296.780548 39.107857,296.669220 38.585155,296.557861
	C38.585155,295.310516 38.280663,293.967499 38.637280,292.832153
	C40.277210,287.611206 41.970295,282.396698 43.967926,277.306854
	C44.380669,276.255249 46.173508,275.745270 47.737488,274.990601
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M120.936264,282.235931
	C122.198257,287.899750 123.418442,293.145386 124.638618,298.391052
	C124.048431,298.548187 123.458244,298.705353 122.868057,298.862518
	C119.743973,290.877136 116.619881,282.891754 113.495789,274.906403
	C113.954773,274.428131 114.413750,273.949890 114.872726,273.471649
	C116.328217,274.554352 118.126076,275.388885 119.142021,276.790253
	C120.139603,278.166351 120.342697,280.118469 120.936264,282.235931
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M56.040779,282.193176
	C54.587265,286.367188 53.177414,290.146820 51.750767,293.971497
	C48.528641,291.831482 50.277622,280.623840 54.720314,273.916870
	C59.372677,275.835602 57.412487,278.876556 56.040779,282.193176
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M172.606537,236.299011
	C173.020432,236.164902 173.052032,236.616150 173.085541,236.840591
	C173.091019,237.504944 173.062973,237.944870 173.026489,239.178436
	C173.019913,261.977631 173.021805,283.983185 173.023682,305.988739
	C172.802917,305.997498 172.582138,306.006287 172.028412,306.020630
	C171.797058,288.958588 171.891464,271.890900 172.003998,254.823349
	C172.044418,248.693115 172.128494,242.563187 172.606537,236.299011
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M137.968658,283.966888
	C138.199905,286.162750 138.364716,287.959259 138.529541,289.755768
	C137.847580,289.924286 137.165604,290.092773 136.483643,290.261292
	C134.367584,285.445648 132.251511,280.630005 129.905670,275.291473
	C131.938721,275.170959 133.646500,275.069702 135.383942,274.966736
	C136.273438,278.004669 137.087830,280.786102 137.968658,283.966888
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M122.769104,278.451447
	C122.476631,276.861145 122.348534,275.610046 122.220436,274.358917
	C123.494156,274.771118 125.642967,274.885681 125.900673,275.643402
	C127.676476,280.864929 129.057373,286.220734 130.565262,291.533356
	C129.902573,291.758514 129.239883,291.983704 128.577194,292.208893
	C126.695953,287.736145 124.814720,283.263367 122.769104,278.451447
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M93.892227,291.037537
	C92.482887,285.814362 91.073555,280.591217 89.325043,274.111023
	C91.537056,274.512421 93.582077,274.883514 95.416153,275.730316
	C95.426003,280.797729 95.646797,285.389435 95.867599,289.981110
	C95.867599,289.981110 96.000000,290.401642 96.000977,290.946991
	C95.942635,292.264984 95.883308,293.037628 95.800209,294.119781
	C95.029892,292.875366 94.461060,291.956451 93.892227,291.037537
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M225.232849,300.040527
	C225.107391,279.511963 225.179489,259.036713 225.542511,238.251099
	C225.884598,258.361267 225.935745,278.781738 225.910248,299.682983
	C225.833603,300.163727 225.430405,300.093811 225.232849,300.040527
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M61.267258,288.435669
	C61.474018,283.839874 61.891602,279.618378 62.324844,275.238586
	C64.254303,275.238586 66.011391,275.238586 68.156975,275.238586
	C66.643578,279.848602 65.279396,284.165833 63.734226,288.417328
	C63.604454,288.774353 62.258827,288.689514 61.267258,288.435669
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M174.039597,337.098053
	C172.131256,337.406464 170.217529,338.010712 168.315414,337.976196
	C153.978180,337.715851 139.641846,337.375092 125.309258,336.929413
	C123.384483,336.869568 121.482307,336.082581 119.266495,335.401611
	C124.664009,335.450684 130.364700,335.730499 136.828690,336.360474
	C149.741196,336.839752 161.890396,336.968903 174.039597,337.098053
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M352.462097,190.817535
	C352.033966,172.645615 351.997314,154.279526 352.027161,135.216904
	C352.093628,134.520370 352.064758,134.048431 352.064758,134.048431
	C352.375824,134.698654 352.958344,135.348862 352.958374,135.999100
	C352.959473,154.207199 352.901672,172.415283 352.462097,190.817535
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M219.555603,135.949432
	C218.131104,136.270111 216.237473,136.935440 214.339600,136.947754
	C198.177780,137.052795 182.015182,137.039169 165.375290,137.060684
	C166.537247,136.706802 168.175323,136.054031 169.816498,136.046143
	C186.238876,135.967117 202.661743,135.994186 219.555603,135.949432
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M255.147385,290.991791
	C255.034744,291.301666 254.857956,291.569153 254.399078,291.900269
	C254.133286,275.003967 254.085434,258.001617 254.059967,240.539642
	C254.082336,240.080002 254.362091,240.192245 254.591766,240.578201
	C254.930099,257.640045 255.038742,274.315918 255.147385,290.991791
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M252.604004,296.975281
	C249.181946,298.249207 245.396988,299.853394 241.451340,300.752441
	C237.318192,301.694214 233.037933,302.029999 228.804413,302.456451
	C228.009537,302.536530 227.132111,301.796936 226.152374,301.109375
	C232.963608,299.722900 239.913284,298.649719 246.868195,297.611450
	C248.627075,297.348877 250.402588,297.197815 252.604004,296.975281
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M306.363312,279.764526
	C305.984802,267.294708 306.065552,254.598083 305.861694,241.906036
	C305.833221,240.131729 304.406708,238.379868 303.331116,236.400513
	C304.192963,236.183395 305.351074,236.183395 306.732117,236.183395
	C306.732117,250.656860 306.732117,265.098022 306.363312,279.764526
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M303.889038,136.639893
	C288.971222,136.886688 273.817902,136.757034 258.317322,136.396881
	C273.197906,136.198715 288.425690,136.231079 303.889038,136.639893
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M256.671204,171.107910
	C257.113861,172.435516 257.932007,173.760544 257.941193,175.091110
	C258.032745,188.409073 257.991180,201.727966 257.676697,215.491257
	C257.366302,215.935928 256.887177,215.867706 256.927551,215.410339
	C256.928131,201.309677 256.888306,187.666412 256.898193,173.657745
	C256.855652,172.564209 256.763428,171.836060 256.671204,171.107910
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M201.534058,334.101562
	C193.887329,334.999725 185.786209,335.820801 177.338577,336.425354
	C185.021255,335.480743 193.050461,334.752655 201.534058,334.101562
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M174.231979,336.980652
	C161.890396,336.968903 149.741196,336.839752 137.286194,336.420380
	C149.353943,336.100403 161.727493,336.070648 174.570343,336.127167
	C174.895111,336.487457 174.690018,336.704071 174.231979,336.980652
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M224.116150,173.018188
	C224.079529,172.603180 224.042923,172.188156 224.493195,171.394272
	C235.376648,171.018280 245.773193,171.021164 256.169739,171.024063
	C256.169739,171.024063 256.445984,170.928268 256.558594,171.018097
	C256.763428,171.836060 256.855652,172.564209 256.680725,173.653214
	C256.413544,174.014069 255.978317,174.011230 255.849335,173.637878
	C252.379501,172.853989 249.035110,172.076965 245.698578,172.109390
	C238.797058,172.176468 231.899719,172.674347 224.779495,172.999008
	C224.558319,173.002960 224.116150,173.018188 224.116150,173.018188
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M381.734985,347.718170
	C370.327301,348.067108 358.913330,347.962952 347.225525,347.527527
	C358.544006,347.219177 370.136383,347.242126 381.734985,347.718170
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M223.240631,216.373108
	C223.161835,215.933899 223.636719,215.917679 224.331787,215.935638
	C235.646957,215.924957 246.267075,215.896332 256.887177,215.867706
	C256.887177,215.867706 257.366302,215.935928 257.607544,215.953552
	C257.256836,216.313995 256.664825,216.955414 256.072937,216.955307
	C245.155106,216.953354 234.237259,216.874725 223.240631,216.373108
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M351.875916,133.643188
	C352.064758,134.048431 352.093628,134.520370 352.027344,134.746552
	C351.597473,134.903137 351.233887,134.833557 350.251282,134.537872
	C340.099640,134.269775 330.567017,134.227768 321.034363,134.185760
	C321.034363,134.185760 320.604675,134.119171 320.387604,134.112732
	C320.568024,133.742218 320.965973,133.059937 321.362915,133.060547
	C331.471039,133.076187 341.579071,133.163315 351.875916,133.643188
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M203.952698,391.313324
	C203.952148,390.861298 204.171783,390.814728 205.180573,390.831146
	C213.630051,390.850159 221.290329,390.806213 228.950623,390.762268
	C229.155151,390.786377 229.359665,390.810486 229.868240,390.890991
	C228.875900,391.304871 227.579666,391.968475 226.283051,391.969208
	C218.913040,391.973358 211.542923,391.819122 203.952698,391.313324
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M382.401917,290.745392
	C382.696045,290.238403 383.405304,289.142242 384.109375,289.145569
	C391.541595,289.180664 398.973022,289.391052 406.696014,289.856750
	C398.929779,290.329132 390.872192,290.497864 382.401917,290.745392
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M95.930252,289.520996
	C95.646797,285.389435 95.426003,280.797729 95.497009,276.087830
	C95.856842,280.333374 95.924873,284.697113 95.930252,289.520996
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M142.951294,268.712219
	C139.215134,267.180481 142.738617,264.724487 142.590164,262.284729
	C142.880173,264.115021 142.956284,266.222961 142.951294,268.712219
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M53.571533,227.939117
	C51.232231,228.953583 48.483032,229.972824 45.347195,230.984131
	C47.694248,229.965408 50.427940,228.954666 53.571533,227.939117
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M63.718521,224.201721
	C62.551296,224.988724 61.030827,225.775345 59.245911,226.351776
	C60.442734,225.494843 61.903999,224.848083 63.718521,224.201721
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M455.125458,330.618622
	C454.421234,330.250275 453.700378,329.531708 452.930450,328.470703
	C453.623871,328.841614 454.366364,329.554993 455.125458,330.618622
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M97.552124,83.408127
	C97.846100,95.393692 97.978424,107.719994 97.988411,120.046394
	C98.012459,149.708694 97.979187,179.371033 97.937088,209.497284
	C97.606056,208.534805 97.047424,207.108734 97.045700,205.681961
	C96.997635,165.857269 97.003998,126.032501 97.018776,86.207756
	C97.019073,85.388100 97.224899,84.568527 97.552124,83.408127
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M321.374695,134.412415
	C330.567017,134.227768 340.099640,134.269775 349.973999,134.593994
	C340.782104,134.797150 331.248566,134.718109 321.374695,134.412415
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M173.283386,305.667297
	C173.021805,283.983185 173.019913,261.977631 173.042694,239.509476
	C173.377213,240.294540 173.953659,241.541473 173.957092,242.789993
	C174.012268,262.836548 173.999634,282.883240 173.974136,302.929901
	C173.973114,303.735413 173.693130,304.540558 173.283386,305.667297
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M255.382355,290.653137
	C255.038742,274.315918 254.930099,257.640045 254.722992,240.504074
	C255.076950,240.875458 255.925354,241.707962 255.923157,242.538223
	C255.880920,258.463806 255.738800,274.389099 255.382355,290.653137
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M256.927551,215.410339
	C246.267075,215.896332 235.646957,215.924957 224.566833,215.901001
	C224.081665,201.881958 224.056534,187.915512 224.073761,173.483612
	C224.116150,173.018188 224.558319,173.002960 224.776596,173.468201
	C224.996017,185.911728 225.118500,197.891937 224.927704,209.867142
	C224.866852,213.686905 225.893646,215.251968 229.973892,215.078613
	C236.948669,214.782318 243.952438,214.803253 250.929550,215.069901
	C254.876846,215.220764 256.136902,213.895538 256.064270,209.944595
	C255.844131,197.970322 255.980698,185.989502 255.978317,174.011230
	C255.978317,174.011230 256.413544,174.014069 256.631012,174.018600
	C256.888306,187.666412 256.928131,201.309677 256.927551,215.410339
z'
        />
        <path
          fill='currentColor'
          opacity='1.000000'
          stroke='none'
          d='
M255.849335,173.637878
	C255.980698,185.989502 255.844131,197.970322 256.064270,209.944595
	C256.136902,213.895538 254.876846,215.220764 250.929550,215.069901
	C243.952438,214.803253 236.948669,214.782318 229.973892,215.078613
	C225.893646,215.251968 224.866852,213.686905 224.927704,209.867142
	C225.118500,197.891937 224.996017,185.911728 224.997772,173.464264
	C231.899719,172.674347 238.797058,172.176468 245.698578,172.109390
	C249.035110,172.076965 252.379501,172.853989 255.849335,173.637878
z'
        />
      </svg>
      <div className='flex flex-col items-center justify-center'>
        <div>{NAME}</div>
        <div className='font-sans text-sm font-extralight text-gray-700'>
          {location}
        </div>
      </div>
    </Link>
  )
}